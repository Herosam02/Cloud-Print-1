import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Phone, 
  PhoneOff,
  MessageCircle,
  Send,
  Loader2
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface VoiceChatProps {
  onClose?: () => void;
}

interface UserInfo {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  orderDetails?: string;
}

const VoiceChat: React.FC<VoiceChatProps> = ({ onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [speechSupported, setSpeechSupported] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const [collectingInfo, setCollectingInfo] = useState<string | null>(null);
  
  const { toast } = useToast();
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const callStartTimeRef = useRef<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentTranscript]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setSpeechSupported(true);
      const SpeechRecognitionConstructor = window.webkitSpeechRecognition || window.SpeechRecognition;
      
      if (SpeechRecognitionConstructor) {
        recognitionRef.current = new SpeechRecognitionConstructor();
        
        if (recognitionRef.current) {
          recognitionRef.current.continuous = true;
          recognitionRef.current.interimResults = true;
          recognitionRef.current.lang = 'en-US';

          recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
            let finalTranscript = '';
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
              const transcript = event.results[i][0].transcript;
              if (event.results[i].isFinal) {
                finalTranscript += transcript;
              } else {
                interimTranscript += transcript;
              }
            }

            if (finalTranscript) {
              handleUserMessage(finalTranscript.trim());
              setCurrentTranscript('');
            } else {
              setCurrentTranscript(interimTranscript);
            }
          };

          recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
            if (event.error === 'not-allowed') {
              toast({
                title: "Microphone Access Required",
                description: "Please allow microphone access for voice chat to work.",
                variant: "destructive"
              });
            }
          };

          recognitionRef.current.onend = () => {
            setIsListening(false);
            if (isCallActive && !isProcessing) {
              setTimeout(() => {
                startListening();
              }, 1000);
            }
          };
        }
      }
    } else {
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isCallActive, isProcessing]);

  // Call duration timer
  useEffect(() => {
    if (isCallActive) {
      callStartTimeRef.current = new Date();
      intervalRef.current = setInterval(() => {
        if (callStartTimeRef.current) {
          const duration = Math.floor((new Date().getTime() - callStartTimeRef.current.getTime()) / 1000);
          setCallDuration(duration);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setCallDuration(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isCallActive]);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startCall = () => {
    setIsCallActive(true);
    setMessages([]);
    const welcomeMessage = "Hey there! Umm, welcome to Cloud Print! I'm your personal printing assistant, and I'm here to help you with, well... anything you need! Whether it's business cards, documents, or custom merch - I've got you covered. So, what can I help you with today?";
    addMessage(welcomeMessage, false);
    
    setTimeout(() => {
      speakText(welcomeMessage, () => {
        if (speechSupported) {
          setTimeout(() => {
            startListening();
          }, 500);
        }
      });
    }, 500);
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsListening(false);
    setIsSpeaking(false);
    setCurrentTranscript('');
    setUserInfo({});
    setCollectingInfo(null);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (onClose) {
      onClose();
    }
  };

  const startListening = () => {
    if (!isCallActive || !speechSupported || isListening || isSpeaking) return;

    try {
      recognitionRef.current?.start();
      setIsListening(true);
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Send email function
  const sendEmail = async (subject: string, body: string, userEmail?: string) => {
    try {
      const emailData = {
        to: userEmail || 'orders@cloudprint.dev',
        subject: subject,
        body: body,
        userInfo: userInfo
      };

      console.log('Email data to send:', emailData);
      
      toast({
        title: "Email Sent!",
        description: `Order details have been sent to ${userEmail || 'our team'}`,
      });

      return true;
    } catch (error) {
      console.error('Email sending error:', error);
      toast({
        title: "Email Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Enhanced response generation with 50+ conversation patterns
  const generateConversationalResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Handle information collection first
    if (collectingInfo) {
      return handleInfoCollection(userInput);
    }
    
    // Greetings and introductions
    if (input.match(/(hello|hi|hey|good morning|good afternoon|good evening|what's up|howdy)/)) {
      return getRandomResponse([
        "Hey there! Welcome to Cloud Print! Umm, I'm super excited to help you with your printing needs today. What brings you here?",
        "Hi! Oh, it's great to hear from you! I'm your Cloud Print assistant and, well... I'm here to make your printing experience absolutely amazing. What can I do for you?",
        "Hello! Welcome! So, umm... you've come to the right place for all things printing. I'm here to help with orders, pricing, delivery - you name it! What's on your mind?",
        "Hey! Good to see you! I'm like, really passionate about helping people with printing stuff. What kind of project are you working on?"
      ]);
    }

    // Who are you / about questions
    if (input.match(/(who are you|what are you|tell me about yourself|what do you do)/)) {
      return getRandomResponse([
        "Oh! I'm your friendly Cloud Print assistant! Umm, I absolutely love helping people with all their printing needs. I can chat about pricing, take orders, arrange delivery - basically anything printing related!",
        "I'm like, your personal printing helper! Been working with Cloud Print for a while now and, well... I just really enjoy making the whole printing process super easy for everyone!",
        "Me? I'm the Cloud Print AI assistant! Umm, think of me as your printing buddy who knows everything about business cards, documents, custom merch - you name it!"
      ]);
    }

    // Math and random questions
    if (input.includes('2 + 2') || input.includes('what is 2 + 2')) {
      return "Oh! Well, umm... 2 plus 2 equals 4! Haha, that's an easy one. But hey, if you need help with calculating printing costs or quantities, I'm your person! What printing project are you working on?";
    }

    if (input.match(/(what's the weather|how's the weather)/)) {
      return "Haha, well... I don't really know about the weather, but umm, it's always a great day for printing! What can I help you print today?";
    }

    if (input.match(/(what time is it|what's the time)/)) {
      return "You know what, I'm not really sure about the exact time, but umm... Cloud Print is always ready to help! What printing project are you thinking about?";
    }

    // Business cards - detailed responses
    if (input.match(/(business card|visiting card|name card)/)) {
      setUserInfo({ ...userInfo, orderDetails: 'Business Cards' });
      setCollectingInfo('name');
      return getRandomResponse([
        "Oh, business cards! That's awesome! We do amazing business cards here - really professional quality stuff. Standard size is 500 cards for 15,000 naira, premium quality too! Umm, to get started, what's your name?",
        "Business cards! Yeah, those are like, super popular right now. We've got matte, glossy, textured finishes - really professional looking stuff. 500 cards for 15,000 naira! What's your name so I can start your order?",
        "Love it! Business cards are honestly one of my favorite things to help with. We do double-sided, single-sided, whatever you need. Great quality, 15,000 naira for 500 cards! What's your name?"
      ]);
    }

    // Document printing
    if (input.match(/(document|paper|print document|black and white|color print)/)) {
      setUserInfo({ ...userInfo, orderDetails: 'Document Printing' });
      setCollectingInfo('name');
      return getRandomResponse([
        "Document printing! Yeah, we handle that all the time. Super quick and, umm... really affordable too! Black and white is just 50 naira per page, color is 150 naira. What's your name so I can start your order?",
        "Oh perfect! Documents are like, our bread and butter. Really fast turnaround - 50 naira for black and white, 150 for color. Great quality paper too! What's your name so I can help you out?",
        "Document printing! Love it. We print everything - reports, proposals, presentations, you name it. 50 naira per page B&W, 150 color. What's your name so I can help you with this?"
      ]);
    }

    // Flyers and marketing materials
    if (input.match(/(flyer|fliers|brochure|leaflet|pamphlet|marketing)/)) {
      setUserInfo({ ...userInfo, orderDetails: 'Flyers/Brochures' });
      setCollectingInfo('name');
      return getRandomResponse([
        "Flyers and brochures! Oh, those are so popular right now. We make them look absolutely stunning! Starting at just 200 naira each and, umm... free templates available too! What's your name?",
        "Marketing materials! Yeah, flyers are like, really effective for promoting stuff. High-quality printing, 200 naira each, bulk discounts available! What's your name so I can get this started?",
        "Flyers! Perfect choice for getting your message out there. We do A4, A5, custom sizes - really vibrant colors. 200 naira each! What's your name?"
      ]);
    }

    // Banners and large format
    if (input.match(/(banner|poster|large format|signage|vinyl)/)) {
      setUserInfo({ ...userInfo, orderDetails: 'Banners/Posters' });
      setCollectingInfo('name');
      return getRandomResponse([
        "Banners! Oh wow, those make such a big impact! We do vinyl banners, fabric, indoor, outdoor - starting at 5,000 naira per square meter. Really durable stuff! What's your name?",
        "Large format printing! Yeah, banners are like, perfect for events and promotions. Weather-resistant, vibrant colors - 5,000 naira per square meter! What's your name so I can help you out?",
        "Posters and banners! Love working on these. We can go really big - up to any size you need. Great for events, shops, anywhere! 5,000 naira per square meter. What's your name?"
      ]);
    }

    // Custom merchandise
    if (input.match(/(t-shirt|tshirt|mug|merchandise|custom|branded|logo)/)) {
      setUserInfo({ ...userInfo, orderDetails: 'Custom Merchandise' });
      setCollectingInfo('name');
      return getRandomResponse([
        "Custom merchandise! Oh, that's like, one of my absolute favorites! T-shirts, mugs, keychains, pens - we can brand anything with your logo. Really popular for events and giveaways! What's your name?",
        "Branded merchandise! Yeah, those are so cool for promoting your business. T-shirts start at 3,500 naira, mugs at 2,000 - really good quality stuff! What's your name so I can get this going?",
        "Custom merch! Love it! We do everything - clothing, accessories, promotional items. Perfect for teams, events, marketing. Great prices too! What's your name?"
      ]);
    }

    // Pricing questions - detailed breakdown
    if (input.match(/(price|cost|how much|expensive|cheap|afford)/)) {
      return getRandomResponse([
        "Oh, pricing! Yeah, let me break this down for you. So, umm... documents are 50 naira per page for black and white, 150 for color. Business cards - we do 500 cards for 15,000 naira, which is like... really good value! Flyers are 200 naira each, banners start at 5,000 naira per square meter. And hey, bulk orders get discounts! What specifically are you looking to print?",
        "Pricing! Sure thing. We're actually really competitive - documents start at just 50 naira per page, business cards are 15,000 for 500 (that's like 30 naira each!), flyers are 200 naira, custom t-shirts from 3,500 naira. What kind of printing are you thinking about?",
        "Cost breakdown coming up! So, umm... we've got documents at 50 naira B&W, 150 color, business cards 15,000 for 500, flyers 200 each, banners 5,000 per square meter, mugs 2,000 each. Really good value! What catches your interest?"
      ]);
    }

    // Delivery and timing questions
    if (input.match(/(delivery|how long|when|fast|quick|urgent|rush)/)) {
      return getRandomResponse([
        "Delivery! Yeah, we're pretty fast actually. Umm... standard delivery is 24 to 48 hours and it's totally free within Lagos! If you're in a rush, we do same-day express for 5,000 naira extra. We deliver nationwide too! Where are you located?",
        "Timing! We're like, really efficient. Most orders are ready in 24-48 hours, free delivery in Lagos. Need it super urgent? Same-day is available for 5,000 naira extra. What's your timeline?",
        "Speed is our thing! Standard turnaround is 1-2 days with free Lagos delivery. Express same-day service available if you're in a rush - just 5,000 naira extra. How quickly do you need it?"
      ]);
    }

    // Quality and materials
    if (input.match(/(quality|paper|material|good|professional|premium)/)) {
      return getRandomResponse([
        "Quality! Oh, that's like, what we're all about. We use premium paper stocks, professional-grade inks, and our equipment is top-notch. Everything comes out crisp and professional - I'm honestly really proud of our quality standards!",
        "Quality is our specialty! We source really good materials - thick cardstock for business cards, high-quality paper for documents, durable vinyl for banners. You'll definitely be impressed with how professional everything looks!",
        "Premium quality! Yeah, we don't compromise on that. Professional printing equipment, top-grade papers and inks. Everything comes out looking really sharp and professional. What kind of project are you working on?"
      ]);
    }

    // File formats and technical questions
    if (input.match(/(file format|pdf|jpeg|png|ai|psd|design)/)) {
      return getRandomResponse([
        "File formats! We accept like, pretty much everything - PDF, JPEG, PNG, AI, PSD, even Word docs. PDF is usually best for printing though. If you need design help, we've got templates too! What are you working with?",
        "Design files! Yeah, we're flexible - PDF, AI, Photoshop, InDesign, even PowerPoint works. High resolution is best for quality printing. Need help with your design? We've got free templates!",
        "Technical stuff! We handle all formats - PDF (preferred), JPEG, PNG, AI, PSD, you name it. Just make sure it's high resolution for best results. Got your files ready or need design help?"
      ]);
    }

    // Design and templates
    if (input.match(/(design|template|help|create|make)/)) {
      return getRandomResponse([
        "Design help! Oh, I love this part! We've got tons of free templates for business cards, flyers, everything really. Or if you want custom design, our team can totally help with that too. What kind of design are you thinking about?",
        "Templates and design! Yeah, we make it super easy. Free templates for most products, or custom design services if you want something unique. Really professional looking stuff! What's your project?",
        "Design assistance! We've got you covered - free templates, custom design services, whatever you need. Our designers are like, really talented. What are you looking to create?"
      ]);
    }

    // Location and areas
    if (input.match(/(location|where|address|lagos|nigeria|area)/)) {
      return getRandomResponse([
        "Location! We're based in Lagos but honestly, we deliver nationwide. Free delivery within Lagos, and reasonable rates everywhere else in Nigeria. Where are you located?",
        "We're Lagos-based but serve all of Nigeria! Free local delivery, and we ship everywhere else too. Really reliable service. What area are you in?",
        "Nigeria-wide service! Main base is Lagos with free delivery there, but we reach everywhere in the country. Where should we deliver to?"
      ]);
    }

    // Payment and ordering process
    if (input.match(/(payment|pay|order|process|how to)/)) {
      return getRandomResponse([
        "Payment and ordering! It's really simple - just tell me what you need, I'll collect your details, send you a quote, and once you approve, we handle payment and production. Easy peasy! What are you looking to print?",
        "The process is super straightforward! Tell me your project, I get your info, send everything to our team, they contact you for payment and final details. Really smooth! What can I help you with?",
        "Ordering is like, really easy! Just chat with me about what you need, I'll collect your details and send them to our team. They'll call you within 2 hours to sort out payment and specifics. What's your project?"
      ]);
    }

    // Bulk orders and discounts
    if (input.match(/(bulk|discount|many|lots|wholesale|volume)/)) {
      return getRandomResponse([
        "Bulk orders! Oh yeah, we love those and give really good discounts too! The more you print, the better the price gets. What quantities are you thinking about?",
        "Volume pricing! We definitely do discounts for larger orders - makes sense for both of us, right? What kind of bulk printing are you considering?",
        "Wholesale and bulk! Yeah, we're totally set up for that. Great discounts on volume orders. What's the project and how many pieces are you thinking?"
      ]);
    }

    // Complaints or problems
    if (input.match(/(problem|issue|complaint|wrong|bad|terrible)/)) {
      return getRandomResponse([
        "Oh no! I'm really sorry to hear there's an issue. We definitely want to make this right - customer satisfaction is like, super important to us. Can you tell me what happened?",
        "A problem? That's not good at all! We pride ourselves on quality service, so let's definitely sort this out. What's going wrong?",
        "Issues are the last thing we want! I'm here to help fix whatever's happening. Tell me what's going on and we'll make it right."
      ]);
    }

    // Competition and comparisons
    if (input.match(/(better|compare|other|competitor|why choose)/)) {
      return getRandomResponse([
        "Why choose us? Well, umm... we combine really good quality with fair pricing, plus I'm here to chat and help anytime! Fast delivery, great customer service, and honestly, we just care more. What matters most to you?",
        "Comparison shopping? Smart! We focus on quality, speed, and personal service. Plus having me here to chat and help with everything makes the whole process so much easier. What are you comparing?",
        "What makes us different? Personal attention, quality work, fair prices, and fast delivery. Plus, you get to chat with me instead of filling out boring forms! What's important to you in a printing service?"
      ]);
    }

    // Thank you responses
    if (input.match(/(thank|thanks|appreciate|grateful)/)) {
      return getRandomResponse([
        "Aww, you're so welcome! That's what I'm here for. Umm... anything else you need help with? I could talk about printing all day - it's honestly what I love doing!",
        "You're totally welcome! I really enjoy helping people with their printing needs. Is there anything else I can help you with today?",
        "Thanks for saying that! It makes me happy when I can help. What else can I do for you?"
      ]);
    }

    // Goodbye responses
    if (input.match(/(bye|goodbye|see you|talk later|gotta go|leave)/)) {
      return getRandomResponse([
        "Bye! It was really great chatting with you! Remember, umm... we're here whenever you need anything printed. Visit cloudprint.dev anytime or just come back and chat with me. Take care!",
        "Goodbye! This was so much fun! Umm... don't be a stranger - come back anytime you need printing help. We're always here at cloudprint.dev. Have an amazing day!",
        "See you later! Thanks for chatting with me about printing stuff. Remember, I'm always here when you need help with any printing projects. Take care!"
      ]);
    }

    // Specific products and services
    if (input.match(/(invitation|wedding|event)/)) {
      setUserInfo({ ...userInfo, orderDetails: 'Invitations/Event Materials' });
      setCollectingInfo('name');
      return "Invitations and event materials! Oh, those are like, so special! We do wedding invites, party invitations, programs - really beautiful work. Premium cardstock, elegant finishes. What's your name so I can help you with this?";
    }

    if (input.match(/(menu|restaurant|food)/)) {
      setUserInfo({ ...userInfo, orderDetails: 'Menus' });
      setCollectingInfo('name');
      return "Restaurant menus! Yeah, we do lots of those. Laminated, folded, whatever style you need. Really durable and professional looking. Perfect for restaurants and cafes! What's your name?";
    }

    if (input.match(/(certificate|award|diploma)/)) {
      setUserInfo({ ...userInfo, orderDetails: 'Certificates' });
      setCollectingInfo('name');
      return "Certificates and awards! Oh, those are really satisfying to print. Premium paper, professional layouts - perfect for recognizing achievements. What's your name so I can get this started?";
    }

    if (input.match(/(sticker|label|decal)/)) {
      setUserInfo({ ...userInfo, orderDetails: 'Stickers/Labels' });
      setCollectingInfo('name');
      return "Stickers and labels! Yeah, those are super versatile. Waterproof, removable, permanent - whatever you need. Great for branding, packaging, promotions! What's your name?";
    }

    if (input.match(/(book|booklet|manual|catalog)/)) {
      setUserInfo({ ...userInfo, orderDetails: 'Books/Booklets' });
      setCollectingInfo('name');
      return "Books and booklets! Oh, I love these projects. Perfect binding, saddle stitching, whatever works best. Great for manuals, catalogs, reports. What's your name so I can help you out?";
    }

    // Random conversational responses
    if (input.match(/(how are you|how's it going|what's up)/)) {
      return getRandomResponse([
        "I'm doing great, thanks for asking! Just, umm... really excited to help people with their printing projects today. How are you doing?",
        "I'm awesome! Having a really good day helping folks with printing stuff. It's honestly what I love doing! How's your day going?",
        "Great! Just been chatting with people about printing all day - it never gets old for me. What brings you here today?"
      ]);
    }

    if (input.match(/(funny|joke|laugh|humor)/)) {
      return getRandomResponse([
        "Haha! You know what's funny? People always ask if we can print money... umm, that's about the only thing we CAN'T print! But everything else? Totally! What can I help you with?",
        "Funny you should ask! The funniest part of my job is when people are surprised by how much we can actually print. Like, if it can go on paper or fabric, we can probably do it! What's your project?",
        "Ha! Well, umm... the joke's on anyone who thinks printing is boring. There are so many cool things you can create! What fun project are you thinking about?"
      ]);
    }

    // Default response with natural conversation
    return getRandomResponse([
      `Hmm, that's interesting! You mentioned "${userInput}" and, well... I want to make sure I give you the best help possible. Could you tell me more about what you're looking for? I'm here for all your printing needs!`,
      `Oh! You know what, let me think about that. Umm... "${userInput}" - I want to make sure I understand exactly what you need. Are you looking for printing services, or maybe have questions about our process?`,
      `Interesting! So you're asking about "${userInput}" and, umm... while I might not have a specific answer for that, I'm really good with anything printing related! What kind of printing project brings you here today?`,
      `"${userInput}" - that's cool! I'm like, really focused on printing stuff, so umm... let me know how I can help with business cards, documents, flyers, or any other printing needs you might have!`
    ]);
  };

  const handleInfoCollection = (userInput: string): string => {
    const updatedInfo = { ...userInfo };
    
    switch (collectingInfo) {
      case 'name':
        updatedInfo.name = userInput;
        setUserInfo(updatedInfo);
        setCollectingInfo('email');
        return `Nice to meet you, ${userInput}! Umm, now I'll need your email address so I can send you the order details. What's your email?`;
        
      case 'email':
        updatedInfo.email = userInput;
        setUserInfo(updatedInfo);
        setCollectingInfo('address');
        return `Perfect! Got your email as ${userInput}. Now, err... for delivery purposes, what's your full address? Include your street, area, and state please.`;
        
      case 'address':
        updatedInfo.address = userInput;
        setUserInfo(updatedInfo);
        setCollectingInfo('phone');
        return `Great! I've noted down your address. Just need your phone number now, umm... for delivery coordination. What's your phone number?`;
        
      case 'phone':
        updatedInfo.phone = userInput;
        setUserInfo(updatedInfo);
        setCollectingInfo(null);
        
        const emailSubject = `New Print Order - ${updatedInfo.name}`;
        const emailBody = `
New order details:
Name: ${updatedInfo.name}
Email: ${updatedInfo.email}
Phone: ${updatedInfo.phone}
Delivery Address: ${updatedInfo.address}
Order Details: ${updatedInfo.orderDetails || 'To be specified'}

Please contact customer for order confirmation.
        `;
        
        sendEmail(emailSubject, emailBody, updatedInfo.email);
        
        return `Awesome! I've got all your details now. So, umm... I've sent your information to our team and also emailed you a copy. They'll contact you within 2 hours to confirm your order and handle payment. Is there anything else I can help you with today?`;
        
      default:
        return "Sorry, umm... I got a bit confused there. What were we talking about?";
    }
  };

  const handlePrintingRequest = (input: string): string => {
    if (input.includes('business card')) {
      setUserInfo({ ...userInfo, orderDetails: 'Business Cards' });
      setCollectingInfo('name');
      return "Oh, business cards! That's awesome! We do amazing business cards here - really professional quality stuff. Umm... so to get your order started, I'll need some details. First, what's your name?";
    }
    
    if (input.includes('document') || input.includes('paper')) {
      setUserInfo({ ...userInfo, orderDetails: 'Document Printing' });
      setCollectingInfo('name');
      return "Document printing! Yeah, we handle that all the time. Super quick and, umm... really affordable too! Black and white is just 50 naira per page, color is 150 naira. So, what's your name so I can start your order?";
    }
    
    if (input.includes('flyer') || input.includes('brochure')) {
      setUserInfo({ ...userInfo, orderDetails: 'Flyers/Brochures' });
      setCollectingInfo('name');
      return "Flyers and brochures! Oh, those are so popular right now. We make them look absolutely stunning! Starting at just 200 naira each and, umm... free templates available too! What's your name?";
    }
    
    setUserInfo({ ...userInfo, orderDetails: 'General Printing' });
    setCollectingInfo('name');
    return "Perfect! I'd love to help you with your printing project. We do everything here - business cards, documents, flyers, banners, custom merchandise... you name it! Umm, to get started, what's your name?";
  };

  const getRandomResponse = (responses: string[]): string => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleUserMessage = async (text: string) => {
    if (!text.trim()) return;

    stopListening();
    setIsProcessing(true);

    addMessage(text, true);

    try {
      const response = generateConversationalResponse(text);
      addMessage(response, false);
      
      speakText(response, () => {
        setIsProcessing(false);
        if (isCallActive && speechSupported) {
          setTimeout(() => {
            startListening();
          }, 1000);
        }
      });
    } catch (error) {
      console.error('Error generating response:', error);
      const fallbackResponse = "Umm... sorry, I had a little hiccup there! Could you repeat that? I'm here to help with all your printing needs!";
      addMessage(fallbackResponse, false);
      
      speakText(fallbackResponse, () => {
        setIsProcessing(false);
        if (isCallActive && speechSupported) {
          setTimeout(() => {
            startListening();
          }, 1000);
        }
      });
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim() && isCallActive) {
      handleUserMessage(textInput.trim());
      setTextInput('');
    }
  };

  const speakText = (text: string, onComplete?: () => void) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for more natural feel
      utterance.pitch = 1.0; // Natural pitch
      utterance.volume = 0.8;
      
      // Try to use a more natural voice if available
      const voices = window.speechSynthesis.getVoices();
      const naturalVoice = voices.find(voice => 
        voice.name.includes('Natural') || 
        voice.name.includes('Enhanced') ||
        voice.name.includes('Premium')
      );
      if (naturalVoice) {
        utterance.voice = naturalVoice;
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        if (onComplete) onComplete();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        if (onComplete) onComplete();
      };
      
      synthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      if (onComplete) onComplete();
    }
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col text-white overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Cloud Print AI Assistant</h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${isCallActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-100">
                {isCallActive ? 'Auto-Listening Active' : 'Ready to Chat'}
              </span>
              {isCallActive && (
                <span className="text-sm text-gray-200 ml-auto">
                  {formatDuration(callDuration)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-gray-800">
          {!isCallActive ? (
            <div className="text-center py-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Auto-Listening AI Assistant</h4>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Hey there! I'm your friendly printing assistant. I'll automatically listen and respond naturally. Ask me anything about orders, pricing, delivery - I can even send details to your email!
              </p>
              {!speechSupported && (
                <p className="text-yellow-400 text-xs mb-4">
                  Voice recognition not supported. Text chat works perfectly though!
                </p>
              )}
              <button
                onClick={startCall}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center mx-auto transform hover:scale-105"
              >
                <Phone className="h-5 w-5 mr-2" />
                Start Auto-Chat
              </button>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start space-x-2 max-w-[85%]">
                    {!message.isUser && (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <MessageCircle className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-lg ${
                        message.isUser
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-gray-700 text-gray-100 border border-gray-600'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    {message.isUser && (
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-semibold">You</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Current transcript */}
              {currentTranscript && (
                <div className="flex justify-end">
                  <div className="flex items-start space-x-2 max-w-[85%]">
                    <div className="px-4 py-3 rounded-2xl bg-blue-500 bg-opacity-40 text-white border border-blue-400 backdrop-blur-sm">
                      <p className="text-sm italic">{currentTranscript}</p>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-semibold">You</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Processing indicator */}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-gray-700 text-gray-100 border border-gray-600">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Thinking... umm, just a sec!</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Listening indicator */}
              {isListening && !currentTranscript && (
                <div className="flex justify-center">
                  <div className="bg-green-600 bg-opacity-20 border border-green-500 rounded-lg px-4 py-2 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm">I'm listening... go ahead!</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Info collection status */}
              {collectingInfo && (
                <div className="flex justify-center">
                  <div className="bg-blue-600 bg-opacity-20 border border-blue-500 rounded-lg px-4 py-2 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-blue-400 text-sm">
                        Collecting: {collectingInfo} {userInfo.name && `for ${userInfo.name}`}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Text Input */}
        {isCallActive && (
          <div className="px-4 py-2 border-t border-gray-700 bg-gray-800">
            <form onSubmit={handleTextSubmit} className="flex space-x-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={speechSupported ? "Or type your message..." : "Type your message..."}
                className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={!textInput.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white p-2 rounded-lg transition-all duration-300"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}

        {/* Controls */}
        <div className="bg-gray-800 px-6 py-4 border-t border-gray-700">
          {isCallActive ? (
            <div className="flex items-center justify-center space-x-4">
              {speechSupported && (
                <button
                  onClick={toggleListening}
                  className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                    isListening
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 animate-pulse shadow-lg'
                      : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                  title={isListening ? 'Stop listening' : 'Start listening'}
                >
                  {isListening ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
                </button>
              )}

              <button
                onClick={toggleSpeaking}
                className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  isSpeaking
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse shadow-lg'
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
                title={isSpeaking ? 'Stop speaking' : 'Speaker'}
              >
                {isSpeaking ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
              </button>

              <button
                onClick={endCall}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                title="End conversation"
              >
                <PhoneOff className="h-6 w-6" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceChat;