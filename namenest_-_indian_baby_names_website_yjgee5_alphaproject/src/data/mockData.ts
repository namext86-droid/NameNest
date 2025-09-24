import { faker } from '@faker-js/faker';
import { BabyName, BlogPost, Testimonial } from '../types';

// Generate mock baby names data
export const generateMockNames = (): BabyName[] => {
  const religions = ['hindu', 'muslim', 'christian', 'sikh'] as const;
  const genders = ['boy', 'girl', 'unisex'] as const;
  
  const hinduNames = [
    { en: 'Aarav', hi: 'आरव', meaning: { en: 'Peaceful, wise', hi: 'शांत, बुद्धिमान' } },
    { en: 'Aadhya', hi: 'आध्या', meaning: { en: 'First power, Goddess Durga', hi: 'प्रथम शक्ति, देवी दुर्गा' } },
    { en: 'Arjun', hi: 'अर्जुन', meaning: { en: 'Bright, shining, white', hi: 'उज्ज्वल, चमकदार, सफेद' } },
    { en: 'Ananya', hi: 'अनन्या', meaning: { en: 'Unique, incomparable', hi: 'अनोखी, अतुलनीय' } },
    { en: 'Krish', hi: 'कृष', meaning: { en: 'Short form of Krishna', hi: 'कृष्ण का छोटा रूप' } },
    { en: 'Diya', hi: 'दीया', meaning: { en: 'Lamp, light', hi: 'दीपक, प्रकाश' } }
  ];

  const muslimNames = [
    { en: 'Aamir', hi: 'आमिर', meaning: { en: 'Rich, prosperous', hi: 'धनी, समृद्ध' } },
    { en: 'Aisha', hi: 'आइशा', meaning: { en: 'Living, prosperous', hi: 'जीवित, समृद्ध' } },
    { en: 'Zain', hi: 'ज़ैन', meaning: { en: 'Beauty, grace', hi: 'सुंदरता, अनुग्रह' } },
    { en: 'Fatima', hi: 'फातिमा', meaning: { en: 'Captivating, one who abstains', hi: 'मोहक, जो संयम रखती है' } },
    { en: 'Rayaan', hi: 'रयान', meaning: { en: 'Gates of paradise', hi: 'स्वर्ग के द्वार' } },
    { en: 'Zara', hi: 'ज़ारा', meaning: { en: 'Blooming flower, princess', hi: 'खिला हुआ फूल, राजकुमारी' } }
  ];

  const christianNames = [
    { en: 'Daniel', hi: 'डेनियल', meaning: { en: 'God is my judge', hi: 'भगवान मेरे न्यायाधीश हैं' } },
    { en: 'Mary', hi: 'मैरी', meaning: { en: 'Beloved, wished for child', hi: 'प्रिय, वांछित बच्चा' } },
    { en: 'David', hi: 'डेविड', meaning: { en: 'Beloved, dear', hi: 'प्रिय, प्यारा' } },
    { en: 'Sarah', hi: 'सारा', meaning: { en: 'Princess, lady', hi: 'राजकुमारी, महिला' } },
    { en: 'Michael', hi: 'माइकल', meaning: { en: 'Who is like God', hi: 'जो भगवान के समान है' } },
    { en: 'Anna', hi: 'अन्ना', meaning: { en: 'Grace, favor', hi: 'कृपा, अनुग्रह' } }
  ];

  const sikhNames = [
    { en: 'Arman', hi: 'अरमान', meaning: { en: 'Desire, wish', hi: 'इच्छा, कामना' } },
    { en: 'Simran', hi: 'सिमरन', meaning: { en: 'Remembrance of God', hi: 'भगवान का स्मरण' } },
    { en: 'Karan', hi: 'करण', meaning: { en: 'Helper, noble', hi: 'सहायक, कुलीन' } },
    { en: 'Jaspreet', hi: 'जसप्रीत', meaning: { en: 'Love for praise of God', hi: 'भगवान की स्तुति के लिए प्रेम' } },
    { en: 'Gurman', hi: 'गुरमन', meaning: { en: 'Heart of the guru', hi: 'गुरु का हृदय' } },
    { en: 'Harleen', hi: 'हरलीन', meaning: { en: 'Absorbed in God', hi: 'भगवान में लीन' } }
  ];

  const allBaseNames = [
    ...hinduNames.map(name => ({ ...name, religion: 'hindu' as const })),
    ...muslimNames.map(name => ({ ...name, religion: 'muslim' as const })),
    ...christianNames.map(name => ({ ...name, religion: 'christian' as const })),
    ...sikhNames.map(name => ({ ...name, religion: 'sikh' as const }))
  ];

  const names: BabyName[] = [];
  
  // Generate 2800 names total (700 each religion)
  religions.forEach(religion => {
    const baseNames = allBaseNames.filter(name => name.religion === religion);
    
    for (let i = 0; i < 700; i++) {
      const baseName = baseNames[i % baseNames.length];
      const variation = i < baseNames.length ? '' : ` ${Math.floor(i / baseNames.length) + 1}`;
      
      names.push({
        id: `${religion}-${i + 1}`,
        slug: `${baseName.en.toLowerCase()}${variation ? `-${variation.trim()}` : ''}-${religion}`,
        name: {
          en: baseName.en + variation,
          hi: baseName.hi + variation
        },
        meaning: baseName.meaning,
        gender: genders[i % 3],
        origin: religion === 'hindu' ? 'Sanskrit' : religion === 'muslim' ? 'Arabic' : religion === 'christian' ? 'Hebrew' : 'Punjabi',
        religion,
        popularity: Math.floor(Math.random() * 100) + 1,
        numerology: Math.floor(Math.random() * 9) + 1
      });
    }
  });

  return names;
};

// Generate mock blog posts
export const generateMockBlogs = (): BlogPost[] => {
  const blogTopics = [
    { title: { en: 'Top 100 Hindu Baby Names for 2025', hi: '2025 के लिए शीर्ष 100 हिंदू बच्चों के नाम' }, slug: 'top-100-hindu-baby-names-2025', tags: ['hindu', 'trending'] },
    { title: { en: 'Beautiful Sikh Names with Deep Meanings', hi: 'गहरे अर्थ वाले सुंदर सिख नाम' }, slug: 'beautiful-sikh-names-deep-meanings', tags: ['sikh', 'spiritual'] },
    { title: { en: 'Modern Muslim Baby Names: Traditional yet Contemporary', hi: 'आधुनिक मुस्लिम बच्चों के नाम: पारंपरिक लेकिन समकालीन' }, slug: 'modern-muslim-baby-names', tags: ['muslim', 'modern'] },
    { title: { en: 'Christian Names with Biblical Significance', hi: 'बाइबिल महत्व वाले ईसाई नाम' }, slug: 'christian-names-biblical-significance', tags: ['christian', 'biblical'] },
    { title: { en: 'Unisex Indian Names Perfect for Your Baby', hi: 'आपके बच्चे के लिए परफेक्ट यूनिसेक्स भारतीय नाम' }, slug: 'unisex-indian-names-perfect-baby', tags: ['unisex', 'modern'] },
    { title: { en: 'The Influence of Astrology on Naming in India', hi: 'भारत में नामकरण पर ज्योतिष का प्रभाव' }, slug: 'astrology-influence-on-naming', tags: ['astrology', 'culture'] },
    { title: { en: 'Choosing a Name: A Guide for New Parents', hi: 'नाम चुनना: नए माता-पिता के लिए एक गाइड' }, slug: 'choosing-a-name-guide', tags: ['parenting', 'tips'] },
    { title: { en: 'The Rise of Short and Sweet Indian Baby Names', hi: 'छोटे और प्यारे भारतीय बच्चों के नामों का उदय' }, slug: 'short-sweet-indian-names', tags: ['trending', 'modern'] },
    { title: { en: 'Nature-Inspired Baby Names from India', hi: 'भारत से प्रकृति-प्रेरित बच्चों के नाम' }, slug: 'nature-inspired-indian-names', tags: ['nature', 'unique'] },
    { title: { en: 'Legendary Names from Indian Mythology', hi: 'भारतीय पौराणिक कथाओं से प्रसिद्ध नाम' }, slug: 'mythological-indian-names', tags: ['mythology', 'hindu'] },
    { title: { en: 'The Numerology Behind Your Baby\'s Name', hi: 'आपके बच्चे के नाम के पीछे का अंक ज्योतिष' }, slug: 'numerology-baby-names', tags: ['numerology', 'astrology'] },
    { title: { en: 'Regional Gems: Beautiful Names from South India', hi: 'क्षेत्रीय रत्न: दक्षिण भारत के सुंदर नाम' }, slug: 'south-indian-baby-names', tags: ['regional', 'culture'] },
    { title: { en: 'How to Host a Traditional Indian Naming Ceremony', hi: 'पारंपरिक भारतीय नामकरण समारोह की मेजबानी कैसे करें' }, slug: 'indian-naming-ceremony', tags: ['culture', 'parenting'] },
    { title: { en: 'Popular Indian Celebrity Baby Names', hi: 'लोकप्रिय भारतीय सेलिब्रिटी बच्चों के नाम' }, slug: 'celebrity-baby-names-india', tags: ['trending', 'celebrity'] },
    { title: { en: 'The Meaning of Colors in Indian Culture and Names', hi: 'भारतीय संस्कृति और नामों में रंगों का अर्थ' }, slug: 'colors-indian-culture-names', tags: ['culture', 'unique'] },
  ];

  return blogTopics.map((topic, index) => ({
    id: `blog-${index + 1}`,
    slug: topic.slug,
    title: topic.title,
    metaDescription: {
      en: `Explore our guide on ${topic.title.en.toLowerCase()}. Discover meanings, cultural significance, and find the perfect name for your child on NameNest.`,
      hi: `${topic.title.hi} पर हमारी गाइड देखें। अर्थ, सांस्कृतिक महत्व की खोज करें, और नेमनेस्ट पर अपने बच्चे के लिए सही नाम खोजें।`
    },
    thumbnail: `https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x250/FF9933/FFFFFF?text=${encodeURIComponent(topic.title.en.substring(0, 15))}`,
    featuredImage: `https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/800x400/FF9933/FFFFFF?text=${encodeURIComponent(topic.title.en.substring(0, 25))}`,
    content: {
      en: `<h2>Introduction to ${topic.title.en}</h2><p>Welcome to our comprehensive guide on ${topic.title.en.toLowerCase()}. In this article, we'll explore beautiful names, their meanings, and cultural significance. This topic is crucial for parents looking for a name that is both meaningful and culturally relevant.</p><h3>Key Considerations</h3><p>Here are some of the most beloved names from this category, each carrying deep meaning and cultural heritage. These names have been carefully selected based on their popularity, meaning, and modern relevance. When choosing, consider the sound, the meaning, and how it aligns with your family's values.</p><h3>Why This Matters</h3><p>Selecting a name for your baby is one of the most important decisions you'll make as a parent. A name carries identity, heritage, and blessings. We hope this guide helps you find the perfect one that resonates with your heart.</p><p>${faker.lorem.paragraphs(5)}</p>`,
      hi: `<h2>${topic.title.hi} का परिचय</h2><p>${topic.title.hi} पर हमारी व्यापक गाइड में आपका स्वागत है। इस लेख में, हम सुंदर नाम, उनके अर्थ और सांस्कृतिक महत्व का पता लगाएंगे। यह विषय उन माता-पिता के लिए महत्वपूर्ण है जो एक सार्थक और सांस्कृतिक रूप से प्रासंगिक नाम की तलाश में हैं।</p><h3>मुख्य विचार</h3><p>यहाँ इस श्रेणी के कुछ सबसे प्रिय नाम हैं, जिनमें से प्रत्येक गहरा अर्थ और सांस्कृतिक विरासत रखता है। इन नामों को उनकी लोकप्रियता, अर्थ और आधुनिक प्रासंगिकता के आधार पर सावधानीपूर्वक चुना गया है।</p><h3>यह क्यों मायने रखता है</h3><p>अपने बच्चे के लिए नाम चुनना माता-पिता के रूप में आपके सबसे महत्वपूर्ण निर्णयों में से एक है। एक नाम पहचान, विरासत और आशीर्वाद देता है। हमें उम्मीद है कि यह मार्गदर्शिका आपको वह सही नाम खोजने में मदद करेगी जो आपके दिल को छू जाए।</p><p>${faker.lorem.paragraphs(5, 'hi')}</p>`
    },
    author: 'NameNest Editorial Team',
    publishedAt: faker.date.recent({ days: 30 }).toISOString(),
    readTime: 5 + Math.floor(Math.random() * 5),
    tags: ['baby names', 'indian culture', 'parenting', ...topic.tags],
    relatedNames: ['aarav', 'diya', 'arjun', 'ananya']
  }));
};

// Generate mock testimonials
export const generateMockTestimonials = (): Testimonial[] => {
  const testimonialData = [
    { name: 'Priya Sharma', location: 'Mumbai, Maharashtra', review: { en: 'NameNest helped us find the perfect name for our daughter. The meanings are so detailed and beautiful!', hi: 'नेमनेस्ट ने हमारी बेटी के लिए सही नाम खोजने में मदद की। अर्थ बहुत विस्तृत और सुंदर हैं!' } },
    { name: 'Rajesh Kumar', location: 'Delhi, NCR', review: { en: 'Amazing collection of traditional and modern names. The Hindi translations are very helpful.', hi: 'पारंपरिक और आधुनिक नामों का अद्भुत संग्रह। हिंदी अनुवाद बहुत सहायक हैं।' } },
    { name: 'Fatima Khan', location: 'Hyderabad, Telangana', review: { en: 'The Islamic names section is comprehensive with beautiful meanings. Highly recommended!', hi: 'इस्लामिक नाम अनुभाग सुंदर अर्थों के साथ व्यापक है। अत्यधिक अनुशंसित!' } },
    { name: 'Gurpreet Singh', location: 'Chandigarh, Punjab', review: { en: 'Found wonderful Sikh names with deep spiritual meanings. The search filters are very useful.', hi: 'गहरे आध्यात्मिक अर्थों के साथ अद्भुत सिख नाम मिले। खोज फिल्टर बहुत उपयोगी हैं।' } },
    { name: 'Maria D\'Souza', location: 'Goa', review: { en: 'Beautiful Christian names with biblical significance. The website is easy to navigate.', hi: 'बाइबिल महत्व के साथ सुंदर ईसाई नाम। वेबसाइट नेविगेट करना आसान है।' } },
    { name: 'Anjali Verma', location: 'Bangalore, Karnataka', review: { en: 'The favorites feature is a lifesaver! My husband and I could easily shortlist names.', hi: 'पसंदीदा सुविधा एक जीवनरक्षक है! मेरे पति और मैं आसानी से नाम शॉर्टलिस्ट कर सकते थे।' } },
    { name: 'Sanjay Patel', location: 'Ahmedabad, Gujarat', review: { en: 'I love the blog articles. They are very informative and well-written.', hi: 'मुझे ब्लॉग लेख बहुत पसंद हैं। वे बहुत जानकारीपूर्ण और अच्छी तरह से लिखे गए हैं।' } },
    { name: 'Meera Iyer', location: 'Chennai, Tamil Nadu', review: { en: 'A fantastic resource for South Indian names. The origin filter is very accurate.', hi: 'दक्षिण भारतीय नामों के लिए एक शानदार संसाधन। मूल फ़िल्टर बहुत सटीक है।' } },
    { name: 'Amitabh Das', location: 'Kolkata, West Bengal', review: { en: 'The multilingual support is excellent. It feels like a website made for all of India.', hi: 'बहुभाषी समर्थन उत्कृष्ट है। ऐसा लगता है कि यह पूरे भारत के लिए बनाई गई वेबसाइट है।' } },
    { name: 'Neha Joshi', location: 'Pune, Maharashtra', review: { en: 'Clean design, fast loading, and a huge database of names. What more could you ask for?', hi: 'स्वच्छ डिजाइन, तेजी से लोड हो रहा है, और नामों का एक विशाल डेटाबेस। आप और क्या मांग सकते हैं?' } }
  ];

  return testimonialData.map((data, index) => ({
    id: `testimonial-${index + 1}`,
    name: data.name,
    avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
    rating: 4 + Math.floor(Math.random() * 2), // 4 or 5 stars
    review: data.review,
    location: data.location,
    date: faker.date.recent({ days: 90 }).toISOString()
  }));
};

export const mockNames = generateMockNames();
export const mockBlogs = generateMockBlogs();
export const mockTestimonials = generateMockTestimonials();
