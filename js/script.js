/* ============================================
   Wael Limousine — Premium JavaScript
   Features: i18n (AR/EN) + Theme (dark/light) +
             WhatsApp booking, scroll effects, fleet grid,
             form validation, PWA, testimonials
   ============================================ */

(function () {
  'use strict';

  // ============ FLEET DATA ============
  // IMPORTANT: each `image` filename matches what's actually in the picture.
  const FLEET = [
    { id: 'maybach', name: 'Mercedes S-Class Maybach', nameAr: 'مرسيدس إس كلاس مايباخ', image: 'images/cars/mercedes-sclass-maybach.jpg', category: { en: 'Ultra Luxury', ar: 'فاخر جداً' }, seats: 4, luggage: 3, ac: 'Dual-Zone' },
    { id: 'g63', name: 'Mercedes G63 AMG', nameAr: 'مرسيدس جي 63 أي إم جي', image: 'images/cars/mercedes-g63-amg.jpg', category: { en: 'Luxury SUV', ar: 'SUV فاخر' }, seats: 5, luggage: 4, ac: 'Tri-Zone' },
    { id: 'eclass', name: 'Mercedes E-Class', nameAr: 'مرسيدس إي كلاس', image: 'images/cars/mercedes-e-class.jpg', category: { en: 'Executive', ar: 'تنفيذي' }, seats: 4, luggage: 3, ac: 'Dual-Zone' },
    { id: 'eclass-amg', name: 'Mercedes E-Class AMG Line', nameAr: 'مرسيدس إي كلاس AMG Line', image: 'images/cars/mercedes-e-class-white.jpg', category: { en: 'Executive Sport', ar: 'تنفيذي رياضي' }, seats: 4, luggage: 3, ac: 'Dual-Zone' },
    { id: 'carnival', name: 'Kia Carnival', nameAr: 'كيا كارنيفال — فان عائلي', image: 'images/cars/kia-carnival.jpg', category: { en: 'Family Van', ar: 'فان عائلي' }, seats: 7, luggage: 6, ac: 'Tri-Zone' },
    { id: 'mgrx5', name: 'MG RX5 Plus', nameAr: 'إم جي آر إكس 5 بلس', image: 'images/cars/mg-rx5-plus.jpg', category: { en: 'SUV', ar: 'SUV' }, seats: 5, luggage: 4, ac: 'Dual-Zone' },
    { id: 'elantra', name: 'Hyundai Elantra 2024', nameAr: 'هيونداي إلنترا 2024', image: 'images/cars/hyundai-elantra-2024.jpg', category: { en: 'Sedan', ar: 'سيدان' }, seats: 4, luggage: 3, ac: 'Dual-Zone' },
    { id: 'corolla', name: 'Toyota Corolla', nameAr: 'تويوتا كورولا', image: 'images/cars/toyota-corolla.jpg', category: { en: 'Sedan', ar: 'سيدان' }, seats: 4, luggage: 3, ac: 'Climate' },
    { id: 'foton', name: 'Foton View', nameAr: 'فوتون فيو — فان عائلي', image: 'images/cars/foton-view-van.jpg', category: { en: 'Family Van', ar: 'فان عائلي' }, seats: 7, luggage: 5, ac: 'Climate' },
    { id: 'elantra-gray', name: 'Hyundai Elantra', nameAr: 'هيونداي إلنترا', image: 'images/cars/hyundai-elantra-gray.jpg', category: { en: 'Sedan', ar: 'سيدان' }, seats: 4, luggage: 3, ac: 'Dual-Zone' },
    { id: 'mg5', name: 'MG 5', nameAr: 'إم جي 5', image: 'images/cars/mg5-red.jpg', category: { en: 'Sedan', ar: 'سيدان' }, seats: 5, luggage: 3, ac: 'Dual-Zone' },
    { id: 'hiace', name: 'Toyota HiAce', nameAr: 'تويوتا هاي إيس', image: 'images/cars/toyota-hiace.jpg', category: { en: 'Luxury Van', ar: 'فان فاخر' }, seats: 12, luggage: 8, ac: 'Tri-Zone' },
    { id: 'coaster', name: 'Toyota Coaster', nameAr: 'تويوتا كوستر', image: 'images/cars/toyota-coaster.jpg', category: { en: 'Mini Bus', ar: 'ميني باص' }, seats: 30, luggage: 10, ac: 'Multi-Zone' }
  ];

  // ============ TESTIMONIALS DATA ============
  const TESTIMONIALS = [
    {
      rating: 5,
      en: { text: "Booked Wael Limousine for our wedding guests — every car arrived spotless, the chauffeurs were courteous, and the timing was perfect. Couldn't have asked for more.", name: 'Ahmed M.', role: 'Wedding Client · Cairo' },
      ar: { text: 'حجزت وائل ليموزين لضيوف فرحي — كل عربية وصلت نظيفة، السواقين محترمين، والتوقيت كان مثالي. ماكنتش عايز أكتر من كده.', name: 'أحمد م.', role: 'عميل فرح · القاهرة' }
    },
    {
      rating: 5,
      en: { text: "I travel to Egypt twice a year for business and Wael is always my first call. Reliable, professional, and they know every corner of Cairo and Giza.", name: 'Sarah K.', role: 'Business Traveler · London' },
      ar: { text: 'بسافر مصر مرتين في السنة للشغل ووائل هو أول ما أتصل بيه. موثوق ومحترف وبيعرفوا كل حتة في القاهرة والجيزة.', name: 'سارة ك.', role: 'مسافرة أعمال · لندن' }
    },
    {
      rating: 5,
      en: { text: "Took the Maybach for a special anniversary dinner. The car was immaculate, the driver was discreet and on time. A truly five-star experience at a fair price.", name: 'Mohamed H.', role: 'Anniversary · Giza' },
      ar: { text: 'أخدت المايباخ لعشاء ذكرى زواج مميزة. العربية كانت ممتازة، السائق محترم ومتأخرش ثانية. تجربة خمس نجوم بسعر معقول.', name: 'محمد ح.', role: 'ذكرى زواج · الجيزة' }
    },
    {
      rating: 5,
      en: { text: "We booked the Kia Carnival for our Umrah trip. Plenty of space, super clean, and the driver handled the long drive like a champ. Highly recommended.", name: 'Fatma A.', role: 'Umrah Trip · Alexandria' },
      ar: { text: 'حجزنا الكيا كارنيفال لرحلة عمرة. واسعة جداً، نظيفة، والسائق عال الطريق الطويل زي المحترفين. بنصح بيها جداً.', name: 'فاطمة أ.', role: 'رحلة عمرة · الإسكندرية' }
    },
    {
      rating: 5,
      en: { text: "Punctual, professional, and the WhatsApp booking made everything effortless. They've been my go-to for 3 years now.", name: 'Khaled R.', role: 'Corporate Client · Maadi' },
      ar: { text: 'دقيقين، محترفين، والحجز عن طريق واتساب خلى كل حاجة سهلة. دول اختياري من 3 سنين.', name: 'خالد ر.', role: 'عميل شركات · المعادي' }
    },
    {
      rating: 5,
      en: { text: "From the airport pickup to the drop-off at the hotel, everything was flawless. The driver was waiting with a sign, helped with the luggage. Top-class service.", name: 'James W.', role: 'Tourist · Sydney' },
      ar: { text: 'من استقبال المطار للتوصيل الفندق، كل حاجة كانت ممتازة. السائق كان مستنيني بلافتة وساعدني في الشنط. خدمة من طراز عالمي.', name: 'جيمس و.', role: 'سائح · سيدني' }
    }
  ];

  const WHATSAPP_NUMBER = '201140999215';

  // ============ I18N DICTIONARY ============
  const I18N = {
    ar: {
      'meta.title': 'وائل ليموزين | Wael Limousine',
      'topbar.address': 'المنشي، كورنيش النيل، الجيزة',
      'nav.home': 'الرئيسية',
      'nav.fleet': 'الأسطول',
      'nav.services': 'الخدمات',
      'nav.testimonials': 'آراء العملاء',
      'nav.about': 'من نحن',
      'nav.booking': 'الحجز',
      'nav.contact': 'تواصل معنا',
      'nav.book': 'احجز الآن',
      'hero.badge': 'خدمة سائق خاص فاخرة',
      'hero.title2': 'ليموزين',
      'hero.subtitle': 'وائل ليموزين',
      'hero.desc': 'عيش تجربة السفر الفاخر في الجيزة والقاهرة. من توصيلات المطار إلى المناسبات المهمة، أسطولنا من السيارات المميزة وسائقون محترفون بيقدموا لك رحلة سلسة من الدرجة الأولى — في كل مرة.',
      'hero.cta1': 'احجز رحلتك',
      'hero.cta2': 'راسلنا واتساب',
      'hero.stat1': 'سيارة فاخرة',
      'hero.stat2': 'متاح 24/7',
      'hero.stat3': 'خدمة VIP',
      'booking.badge': 'حجز سريع',
      'booking.title': 'احجز ليموزينك',
      'booking.subtitle': 'سيتم إرسال الحجز مباشرة عبر واتساب',
      'form.name': 'الاسم الكامل / Client Name',
      'form.namePh': 'اسمك الكامل',
      'form.phone': 'رقم الهاتف / Phone',
      'form.date': 'التاريخ / Date',
      'form.time': 'الوقت / Time',
      'form.car': 'السيارة / Car',
      'form.carDefault': 'اختر السيارة...',
      'form.pickup': 'مكان الانطلاق / Pickup',
      'form.pickupPh': 'مثال: محطة قطار الجيزة',
      'form.dropoff': 'الوجهة / Dropoff',
      'form.dropoffPh': 'مثال: مطار القاهرة',
      'form.submit': 'إرسال عبر واتساب',
      'form.alert': 'من فضلك املأ جميع الحقول',
      'form.phoneInvalid': 'رقم الهاتف لازم يكون 11 رقم ويبدأ بـ 01',
      'fleet.eyebrow': 'أسطولنا',
      'fleet.title': 'سيارات فاخرة',
      'fleet.desc': 'اختار من مجموعتنا المنتقاة بعناية من السيدان، SUV، والفانات العائلية — كل عربية بتتلمع قبل كل رحلة.',
      'fleet.ac': 'تكييف',
      'fleet.passengers': 'ركاب',
      'fleet.luggage': 'شنط',
      'services.eyebrow': 'ماذا نقدم',
      'services.title': 'خدمات مخصصة',
      'services.s1.title': 'توصيلات المطار',
      'services.s1.desc': 'استقبال وتوصيل في مواعيدك لمطار القاهرة ومطار سفنكس مع خدمة استقبال.',
      'services.s2.title': 'حفلات الزفاف والمناسبات',
      'services.s2.desc': 'وصل بأسلوب مميز في يومك الكبير. سيارات مزينة وسائق خاص.',
      'services.s3.title': 'سفر الشركات',
      'services.s3.desc': 'تنفيذ رئاسي محترم ودقيق للاجتماعات والمؤتمرات والوفود المهمة.',
      'services.s4.title': 'رحلات بين المدن',
      'services.s4.desc': 'سفر مريح لمسافات طويلة للإسكندرية وشرم الشيخ والغردقة وغيرها.',
      'services.s5.title': 'رحلات الحج والعمرة',
      'services.s5.desc': 'رحلات العمرة والحج بعناية وراحة واحترام لرحلتك.',
      'services.s6.title': 'جولات المدينة',
      'services.s6.desc': 'الأهرامات والمتاحف ورحلات النيل — استكشف القاهرة والجيزة بسائق خاص.',
      'why.eyebrow': 'ليه تختارنا',
      'why.title': 'تميز لا يُضاهى',
      'why.desc': 'لأكثر من عقد، وائل ليموزين هو الاختيار الموثوق للمسافرين اللي بيرفضوا التنازل. كل تفصيلة — من لمعان الجنوط لحرارة المقصورة — بتختارها لراحتك.',
      'why.l1b': 'سائقون محترفون',
      'why.l1t': '— بزي رسمي، بيتكلموا إنجليزي، متدربين على آداب VIP.',
      'why.l2b': 'سيارات نظيفة',
      'why.l2t': '— بتتلمع قبل كل رحلة، مع مية مجانية وواي فاي.',
      'why.l3b': 'أسعار شفافة',
      'why.l3t': '— أسعار ثابتة، بدون رسوم خفية، بدون زيادة مفاجئة.',
      'why.l4b': 'متاح 24/7',
      'why.l4t': '— ليل أو نهار، بنكون على بُعد ضغطة واحدة.',
      'why.s1': 'سنة خبرة',
      'why.s2': 'سيارة فاخرة',
      'why.s3': 'عميل سعيد',
      'why.s4': 'تقييم العملاء',
      'test.eyebrow': 'آراء العملاء',
      'test.title': 'بيقولوا إيه عننا',
      'test.desc': 'قصص حقيقية من مسافرين ورجال أعمال وعائلات اختاروا وائل ليموزين.',
      'about.eyebrow': 'من نحن',
      'about.title': 'عقد من الخدمة الراقية',
      'about.p1': 'بدأت وائل ليموزين من أكتر من 10 سنين بعربية مرسيدس واحدة ووعد بسيط: نقدّم تجربة سائق خاص تليق بالاسم. دلوقتي، أسطولنا كبر لـ 13 سيارة فاخرة — لكن الوعد ما اتغيرش.',
      'about.p2': 'من أبراج العاصمة الإدارية الجديدة لحجارة أهرامات الجيزة الخالدة، شرفنا نقل آلاف العملاء — دبلوماسيين، رجال أعمال، عرسان جداد، ومعتمرين — عبر كل حتة في مصر.',
      'about.p3': 'كل سائق في فريقنا بيتم اختياره بعناية، بيتكلم إنجليزي، ومتدرّب على فن خدمة VIP الهادئة. كل عربية بتتلمع لحالة المعرض قبل كل رحلة. كل حجز بيتعمل برسالة واتساب واحدة — بدون تطبيقات، بدون انتظار، بدون تعقيد.',
      'about.cta1': 'احجز رحلتك',
      'about.cta2': 'كلمنا',
      'about.k1': 'سنة من التميز',
      'about.k2': 'مرخص ومؤمَّن',
      'about.k3': 'فريق ثنائي اللغة',
      'about.k4': 'رحلة مكتملة',
      'contact.eyebrow': 'تواصل معنا',
      'contact.title': 'الموقع والتواصل',
      'contact.desc': 'كلمنا في أي وقت — بنرد عليك في دقايق على واتساب.',
      'contact.callTitle': 'اتصال / واتساب',
      'contact.addrTitle': 'العنوان',
      'contact.addr': 'المنشي، كورنيش النيل، الجيزة',
      'contact.addrSub': 'بالقرب من مستشفى الطلبة ومحطة قطار الجيزة',
      'contact.mapBadge': 'محطة قطار الجيزة ومنطقة الهرم',
      'footer.tag': 'خدمة سائق خاص فاخرة في الجيزة والقاهرة وكل مصر.',
      'footer.links': 'روابط سريعة',
      'footer.rights': 'جميع الحقوق محفوظة.',
      'toast.title': 'تم إرسال الحجز!',
      'toast.desc': 'هنتأكد من رحلتك عبر واتساب في أقرب وقت.',
      'wa.booking': {
        title: '👑 *وائل ليموزين — حجز جديد* 👑',
        sep: '━━━━━━━━━━━━━━━━━━━━━',
        vehicle: '🚗 *السيارة:*',
        client: '👤 *العميل:*',
        phone: '📞 *الهاتف:*',
        pickup: '📍 *الانطلاق:*',
        dropoff: '🏁 *الوجهة:*',
        date: '📅 *التاريخ:*',
        time: '⏰ *الوقت:*',
        thanks: '✨ شكراً لاختيارك وائل ليموزين.\nسيتم تأكيد الحجز في أقرب وقت ممكن.'
      }
    },
    en: {
      'meta.title': 'Wael Limousine | وائل ليموزين',
      'topbar.address': 'El-Monshi, Nile Corniche, Giza',
      'nav.home': 'Home',
      'nav.fleet': 'Fleet',
      'nav.services': 'Services',
      'nav.testimonials': 'Reviews',
      'nav.about': 'About',
      'nav.booking': 'Booking',
      'nav.contact': 'Contact',
      'nav.book': 'Book Now',
      'hero.badge': 'Premium Chauffeur Service',
      'hero.title2': 'Limousine',
      'hero.subtitle': 'وائل ليموزين',
      'hero.desc': 'Experience the pinnacle of luxury travel in Giza & Cairo. From airport transfers to VIP events, our fleet of premium vehicles and professional chauffeurs deliver a seamless, first-class journey — every time.',
      'hero.cta1': 'Reserve Your Ride',
      'hero.cta2': 'WhatsApp Us',
      'hero.stat1': 'Premium Cars',
      'hero.stat2': '24/7 Available',
      'hero.stat3': 'VIP Service',
      'booking.badge': 'Quick Booking',
      'booking.title': 'Reserve Your Limousine',
      'booking.subtitle': 'Your booking will be sent directly via WhatsApp',
      'form.name': 'Client Name / الاسم الكامل',
      'form.namePh': 'Your full name',
      'form.phone': 'Phone / رقم الهاتف',
      'form.date': 'Date / التاريخ',
      'form.time': 'Time / الوقت',
      'form.car': 'Car / السيارة',
      'form.carDefault': 'Select car...',
      'form.pickup': 'Pickup / مكان الانطلاق',
      'form.pickupPh': 'e.g. Giza Train Station',
      'form.dropoff': 'Dropoff / الوجهة',
      'form.dropoffPh': 'e.g. Cairo Airport',
      'form.submit': 'Send via WhatsApp',
      'form.alert': 'Please fill all fields',
      'form.phoneInvalid': 'Phone must be 11 digits and start with 01',
      'fleet.eyebrow': 'Our Fleet',
      'fleet.title': 'Premium Vehicles',
      'fleet.desc': 'Choose from our handpicked collection of luxury sedans, SUVs, and family vans — every vehicle detailed to perfection before every ride.',
      'fleet.ac': 'AC',
      'fleet.passengers': 'Passengers',
      'fleet.luggage': 'Luggage',
      'services.eyebrow': 'What We Offer',
      'services.title': 'Bespoke Services',
      'services.s1.title': 'Airport Transfers',
      'services.s1.desc': 'On-time pickups & drop-offs at Cairo International and Sphinx airports with meet-and-greet service.',
      'services.s2.title': 'Weddings & Events',
      'services.s2.desc': 'Arrive in style on your big day. Decorated vehicles, red-carpet treatment, and a personal chauffeur.',
      'services.s3.title': 'Corporate Travel',
      'services.s3.desc': 'Discreet, punctual executive transport for meetings, conferences, and VIP delegations.',
      'services.s4.title': 'Inter-City Rides',
      'services.s4.desc': 'Comfortable long-distance travel to Alexandria, Sharm El-Sheikh, Hurghada and beyond.',
      'services.s5.title': 'Pilgrimage Tours',
      'services.s5.desc': 'Umrah and spiritual tours handled with care, comfort, and respect for your journey.',
      'services.s6.title': 'City Tours',
      'services.s6.desc': 'Pyramids, museums, Nile cruises — explore Cairo & Giza with a private driver-guide.',
      'why.eyebrow': 'Why Choose Us',
      'why.title': 'Unmatched Excellence',
      'why.desc': 'For over a decade, Wael Limousine has been the trusted choice for travelers who refuse to compromise. Every detail — from the polish on the rims to the temperature of the cabin — is curated for your comfort.',
      'why.l1b': 'Professional Chauffeurs',
      'why.l1t': '— Uniformed, English-speaking, and trained in VIP etiquette.',
      'why.l2b': 'Pristine Vehicles',
      'why.l2t': '— Detailed before every trip, with complimentary water & Wi-Fi.',
      'why.l3b': 'Transparent Pricing',
      'why.l3t': '— Fixed quotes, no hidden fees, no surge pricing.',
      'why.l4b': '24/7 Availability',
      'why.l4t': '— Day or night, we are one tap away.',
      'why.s1': 'Years Experience',
      'why.s2': 'Luxury Vehicles',
      'why.s3': 'Happy Clients',
      'why.s4': 'Client Rating',
      'test.eyebrow': 'Testimonials',
      'test.title': 'What Our Clients Say',
      'test.desc': 'Real stories from travelers, executives, and families who chose Wael Limousine.',
      'about.eyebrow': 'About Us',
      'about.title': 'A Decade of Refined Service',
      'about.p1': "Wael Limousine began over a decade ago with a single Mercedes and a simple promise: deliver a chauffeur experience worthy of the name. Today, our fleet has grown to thirteen premium vehicles — but the promise hasn't changed.",
      'about.p2': "From the gleaming towers of the New Administrative Capital to the timeless stones of the Pyramids of Giza, we've had the privilege of moving thousands of clients — diplomats, executives, honeymooners, and pilgrims — across every corner of Egypt.",
      'about.p3': "Every chauffeur on our team is handpicked, English-speaking, and trained in the art of discreet VIP service. Every vehicle is detailed to showroom condition before each ride. Every booking is handled with a single WhatsApp message — no apps, no waiting, no hassle.",
      'about.cta1': 'Reserve Your Ride',
      'about.cta2': 'Talk to Us',
      'about.k1': 'Years of Excellence',
      'about.k2': 'Licensed & Insured',
      'about.k3': 'Bilingual Team',
      'about.k4': 'Trips Completed',
      'contact.eyebrow': 'Get In Touch',
      'contact.title': 'Contact & Location',
      'contact.desc': 'Reach us anytime — we respond within minutes on WhatsApp.',
      'contact.callTitle': 'Call / WhatsApp',
      'contact.addrTitle': 'Address',
      'contact.addr': 'El-Monshi, Nile Corniche, Giza',
      'contact.addrSub': 'Near Cairo University Student Hospital and Giza Train Station',
      'contact.mapBadge': 'Giza Train Station & Al Haram Area',
      'footer.tag': 'Premium chauffeur service across Giza, Cairo, and all of Egypt.',
      'footer.links': 'Quick Links',
      'footer.rights': 'All rights reserved.',
      'toast.title': 'Booking Sent!',
      'toast.desc': "We'll confirm your ride via WhatsApp shortly.",
      'wa.booking': {
        title: '👑 *Wael Limousine — New Booking* 👑',
        sep: '━━━━━━━━━━━━━━━━━━━━━',
        vehicle: '🚗 *Vehicle:*',
        client: '👤 *Client:*',
        phone: '📞 *Phone:*',
        pickup: '📍 *Pickup:*',
        dropoff: '🏁 *Dropoff:*',
        date: '📅 *Date:*',
        time: '⏰ *Time:*',
        thanks: '✨ Thank you for choosing Wael Limousine.\nYour booking will be confirmed shortly.'
      }
    }
  };

  // ============ STATE ============
  const state = {
    lang: localStorage.getItem('wl_lang') || 'ar',
    theme: localStorage.getItem('wl_theme') || 'dark'
  };

  // ============ HELPERS ============
  function t(key, lang) {
    const dict = I18N[lang || state.lang] || {};
    // Try nested lookup first (e.g. wa.booking.title)
    const parts = key.split('.');
    let cur = dict;
    for (const p of parts) {
      if (cur && typeof cur === 'object' && p in cur) {
        cur = cur[p];
      } else {
        cur = undefined;
        break;
      }
    }
    if (cur !== undefined) return cur;
    // Fall back to flat-key lookup (e.g. fleet.ac)
    return dict[key];
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
  }

  // ============ APPLY THEME ============
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('wl_theme', theme); } catch (e) {}
  }

  function toggleTheme() {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  }

  // ============ APPLY LANGUAGE ============
  function applyLang(lang) {
    state.lang = lang;
    const dict = I18N[lang];
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    try { localStorage.setItem('wl_lang', lang); } catch (e) {}

    if (dict['meta.title']) document.title = dict['meta.title'];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key, lang);
      if (typeof val === 'string') el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      const val = t(key, lang);
      if (typeof val === 'string') el.placeholder = val;
    });

    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });

    renderFleet();
    renderTestimonials();
  }

  // ============ RENDER FLEET ============
  function renderFleet() {
    const grid = document.getElementById('fleet-grid');
    if (!grid) return;
    const acLabel = t('fleet.ac');
    const paxLabel = t('fleet.passengers');
    const lugLabel = t('fleet.luggage');

    grid.innerHTML = FLEET.map((car, i) => `
      <article class="car-card reveal floating" style="animation-delay:${(i * 0.1)}s">
        <div class="car-img">
          <span class="car-badge"><i class="fa-solid fa-crown mr-1" aria-hidden="true"></i> ${car.category[state.lang]}</span>
          <img src="${car.image}" alt="${car.name}" loading="lazy" decoding="async" onerror="this.style.opacity=0.15" />
        </div>
        <div class="car-body">
          <h3 class="car-name">${car.name}</h3>
          <p class="car-name-ar">${car.nameAr}</p>
          <div class="car-specs">
            <div class="car-spec">
              <i class="fa-solid fa-snowflake" aria-hidden="true"></i>
              <strong>${car.ac}</strong>
              <span>${acLabel}</span>
            </div>
            <div class="car-spec">
              <i class="fa-solid fa-users" aria-hidden="true"></i>
              <strong>${car.seats}</strong>
              <span>${paxLabel}</span>
            </div>
            <div class="car-spec">
              <i class="fa-solid fa-suitcase-rolling" aria-hidden="true"></i>
              <strong>${car.luggage}</strong>
              <span>${lugLabel}</span>
            </div>
          </div>
        </div>
      </article>
    `).join('');

    observeReveal();
  }

  // ============ RENDER TESTIMONIALS ============
  function renderTestimonials() {
    const grid = document.getElementById('testimonials-grid');
    if (!grid) return;

    const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

    grid.innerHTML = TESTIMONIALS.map((t, i) => {
      const data = t[state.lang];
      const initial = data.name.charAt(0).toUpperCase();
      return `
        <article class="testimonial-card reveal" style="transition-delay:${i * 0.08}s">
          <div class="testimonial-stars" aria-label="${t.rating} out of 5 stars">${stars(t.rating)}</div>
          <p class="testimonial-text">${escapeHtml(data.text)}</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar" aria-hidden="true">${initial}</div>
            <div class="testimonial-meta">
              <span class="testimonial-name">${escapeHtml(data.name)}</span>
              <span class="testimonial-role">${escapeHtml(data.role)}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');

    observeReveal();
  }

  // ============ HEADER SCROLL ============
  function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ============ MOBILE MENU ============
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    const openMenu = () => {
      menu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      toggle.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
      toggle.setAttribute('aria-expanded', 'true');
    };
    const closeMenu = () => {
      menu.classList.add('hidden');
      document.body.style.overflow = '';
      toggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      if (menu.classList.contains('hidden')) openMenu();
      else closeMenu();
    });

    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.classList.contains('hidden')) closeMenu();
    });
  }

  // ============ THEME & LANG SWITCHES ============
  function initSwitches() {
    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang')));
    });
  }

  // ============ TOAST ============
  let toastTimer = null;
  function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.classList.remove('hidden', 'hiding');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.classList.add('hidden'), 400);
    }, 4500);
  }

  // ============ BOOKING → WHATSAPP ============
  function initBookingForm() {
    const form = document.getElementById('booking-form');
    if (!form) return;

    const dateInput = form.querySelector('input[name="date"]');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }

    // Restrict phone to digits only
    const phoneInput = form.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 11);
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const dict = I18N[state.lang];

      // Required fields
      const missing = !data.name || !data.phone || !data.pickup || !data.dropoff || !data.date || !data.time || !data.car;
      if (missing) {
        alert(dict['form.alert']);
        return;
      }

      // Phone validation (Egyptian: 11 digits, starts with 01)
      if (!/^01[0-9]{9}$/.test(data.phone)) {
        alert(dict['form.phoneInvalid']);
        if (phoneInput) phoneInput.focus();
        return;
      }

      // Date sanity (must be today or later)
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const picked = new Date(data.date);
      if (picked < today) {
        alert(dict['form.alert']);
        if (dateInput) dateInput.focus();
        return;
      }

      let dateStr = data.date;
      try {
        const d = new Date(data.date);
        dateStr = d.toLocaleDateString(state.lang === 'ar' ? 'ar-EG' : 'en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      } catch (_) {}

      const w = dict['wa.booking'];
      const message = `${w.title}
${w.sep}
${w.vehicle} ${data.car}
${w.client} ${data.name}
${w.phone} ${data.phone}
${w.sep}
${w.pickup} ${data.pickup}
${w.dropoff} ${data.dropoff}
${w.date} ${dateStr}
${w.time} ${data.time}
${w.sep}
${w.thanks}`;

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      const win = window.open(url, '_blank', 'noopener');

      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> <span>WhatsApp</span>';
        setTimeout(() => {
          btn.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> <span>WhatsApp ✓</span>';
          btn.style.background = '#25D366';
          btn.style.color = '#fff';
          showToast();
          setTimeout(() => {
            btn.innerHTML = original;
            btn.disabled = false;
            btn.style.background = '';
            btn.style.color = '';
            form.reset();
            if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];
          }, 2500);
        }, 600);
      }
    });
  }

  // ============ REVEAL ON SCROLL ============
  let revealObserver;
  function observeReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    }
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
  }

  // ============ PARTICLES ============
  function spawnParticles() {
    const wrap = document.getElementById('particles');
    if (!wrap) return;
    wrap.innerHTML = '';
    const COUNT = window.innerWidth < 768 ? 18 : 36;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDelay = (Math.random() * 8) + 's';
      p.style.animationDuration = (6 + Math.random() * 6) + 's';
      p.style.transform = `scale(${0.5 + Math.random() * 1.5})`;
      frag.appendChild(p);
    }
    wrap.appendChild(frag);
  }

  // ============ YEAR ============
  function setYear() {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  // ============ SERVICE WORKER (PWA) ============
  function registerSW() {
    if (!('serviceWorker' in navigator)) return;
    if (location.protocol === 'file:') return; // SW won't work over file://
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('[SW] Registered:', reg.scope))
        .catch(err => console.warn('[SW] Registration failed:', err));
    });
  }

  // ============ BOOT ============
  document.addEventListener('DOMContentLoaded', () => {
    setYear();
    applyTheme(state.theme);
    applyLang(state.lang);
    initHeaderScroll();
    initMobileMenu();
    initSwitches();
    initBookingForm();
    spawnParticles();
    registerSW();
  });
})();
