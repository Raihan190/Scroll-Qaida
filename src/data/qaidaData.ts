export type Language = 'bn' | 'en';

export interface ArabicLetterItem {
  id: number;
  arabic: string;
  nameBn: string;
  nameEn: string;
  translit: string;
  region: 'throat' | 'tongue' | 'lips' | 'nasal' | 'empty';
  regionLabelBn: string;
  regionLabelEn: string;
  makhrajBn: string;
  makhrajEn: string;
  stepsBn: string[];
  stepsEn: string[];
  exampleWord: string;
  exampleMeaningBn: string;
  exampleMeaningEn: string;
}

export const ARABIC_LETTERS: ArabicLetterItem[] = [
  {
    id: 1,
    arabic: 'ا',
    nameBn: 'আলিফ',
    nameEn: 'Alif',
    translit: 'aa',
    region: 'empty',
    regionLabelBn: 'জাওফ (মুখ ও গলার খালি স্থান)',
    regionLabelEn: 'Al-Jawf (Oral & Pharyngeal Cavity)',
    makhrajBn: 'গলার গভীর ও মুখের খালি স্থান থেকে স্বাভাবিক শ্বাসে উচ্চারিত হয়',
    makhrajEn: 'Articulated from the empty space of the throat and mouth with an open airway',
    stepsBn: ['১. মুখ স্বাভাবিকভাবে খুলুন', '২. গলার ভেতর থেকে বিনা বাধায় আওয়াজ বের করুন', '৩. স্পষ্ট স্বরে "আলিফ" বলুন'],
    stepsEn: ['1. Open the mouth naturally', '2. Release sound smoothly from the throat without obstruction', '3. Pronounce "Alif" clearly'],
    exampleWord: 'أَلْحَمْدُ',
    exampleMeaningBn: 'সকল প্রশংসা',
    exampleMeaningEn: 'All praise'
  },
  {
    id: 2,
    arabic: 'ب',
    nameBn: 'বা',
    nameEn: 'Baa',
    translit: 'ba',
    region: 'lips',
    regionLabelBn: 'আশ-শাফাতাইন (দুই ঠোঁট)',
    regionLabelEn: 'Ash-Shafatayn (Both Lips)',
    makhrajBn: 'দুই ঠোঁটের ভেজা অংশ একত্রে মিলিয়ে উচ্চারিত হয়',
    makhrajEn: 'Articulated by pressing the moist inner edges of both lips together',
    stepsBn: ['১. দুই ঠোঁটের ভেজা অংশ হালকাভাবে মেলান', '২. ঠোঁট খুলে স্পষ্ট ধ্বনি বের করুন', '৩. এক আলিফ পরিমাণ "বা" উচ্চারণ করুন'],
    stepsEn: ['1. Press the moist parts of both lips together', '2. Release cleanly with a voiced sound', '3. Pronounce "Baa" smoothly'],
    exampleWord: 'بِسْمِ',
    exampleMeaningBn: 'নামে (শুরু করছি)',
    exampleMeaningEn: 'In the name of'
  },
  {
    id: 3,
    arabic: 'ت',
    nameBn: 'তা',
    nameEn: 'Taa',
    translit: 'ta',
    region: 'tongue',
    regionLabelBn: 'আল-লিসান (জিহ্বার আগা)',
    regionLabelEn: 'Al-Lisan (Tip of the Tongue)',
    makhrajBn: 'জিহ্বার আগা সামনের উপরের দুই দাঁতের গোড়ার সাথে লাগিয়ে উচ্চারিত হয়',
    makhrajEn: 'Tip of the tongue touching the gum line of the upper two front incisors',
    stepsBn: ['১. জিহ্বার আগা উপরের সামনের দাঁতের গোড়ায় স্পর্শ করুন', '২. হালকা বাতাসসহ নরমভাবে ছাড়ুন', '৩. পাতলা স্বরে "তা" বলুন'],
    stepsEn: ['1. Touch the tongue tip to the upper front gum ridge', '2. Release with a gentle breath', '3. Keep the tone light and soft'],
    exampleWord: 'تَوَّابٌ',
    exampleMeaningBn: 'তওবা কবুলকারী',
    exampleMeaningEn: 'Acceptor of repentance'
  },
  {
    id: 4,
    arabic: 'ث',
    nameBn: 'ছা',
    nameEn: 'Thaa',
    translit: 'tha',
    region: 'tongue',
    regionLabelBn: 'আল-লিসান (জিহ্বার আগা ও দাঁতের কিনারা)',
    regionLabelEn: 'Al-Lisan (Tongue Tip & Incisor Edge)',
    makhrajBn: 'জিহ্বার আগা সামনের উপরের দুই দাঁতের আগার সাথে লাগিয়ে নরমভাবে উচ্চারিত হয়',
    makhrajEn: 'Tip of the tongue lightly touching the bottom edge of the upper front teeth',
    stepsBn: ['১. জিহ্বার আগা সামনের উপরের দাঁতের নিচের কিনারায় আনুন', '২. শিস না দিয়ে নরম বাতাস বের করুন', '৩. নরম স্বরে "ছা" বলুন'],
    stepsEn: ['1. Place tongue tip gently against upper teeth edge', '2. Blow softly without whistling', '3. Pronounce a soft "Thaa"'],
    exampleWord: 'ثَوَابٌ',
    exampleMeaningBn: 'উত্তম প্রতিদান',
    exampleMeaningEn: 'Reward'
  },
  {
    id: 5,
    arabic: 'ج',
    nameBn: 'জীম',
    nameEn: 'Jeem',
    translit: 'ja',
    region: 'tongue',
    regionLabelBn: 'জিহ্বার মধ্যভাগ',
    regionLabelEn: 'Middle of the Tongue',
    makhrajBn: 'জিহ্বার মাঝখান উপরের তালুর সাথে লাগিয়ে উচ্চারিত হয়',
    makhrajEn: 'Middle of the tongue pressing firmly against the middle roof of the palate',
    stepsBn: ['১. জিহ্বার মধ্যভাগ তালুর সাথে স্পর্শ করুন', '২. বাতাস আটকে রেখে স্পষ্ট ধ্বনি তুলুন', '৩. তিন আলিফ পরিমাণ "জীম" টেনে পড়ুন'],
    stepsEn: ['1. Raise the middle of the tongue to the hard palate', '2. Hold the airflow briefly before release', '3. Pronounce a crisp "Jeem"'],
    exampleWord: 'جَنَّةٌ',
    exampleMeaningBn: 'জান্নাত বা উদ্যান',
    exampleMeaningEn: 'Garden of Paradise'
  },
  {
    id: 6,
    arabic: 'ح',
    nameBn: 'হা',
    nameEn: 'Haa',
    translit: 'ha',
    region: 'throat',
    regionLabelBn: 'ওয়াসাতুল হালক (গলার মধ্যভাগ)',
    regionLabelEn: 'Wasat al-Halq (Middle Throat)',
    makhrajBn: 'গলার মধ্যভাগ থেকে পরিষ্কার ও মৃদু ঘর্ষণযুক্ত শ্বাসে উচ্চারিত হয়',
    makhrajEn: 'Articulated from the middle of the throat with a clean, voiceless breath',
    stepsBn: ['১. গলার মাঝখানে সামান্য সংকোচন তৈরি করুন', '২. বুক থেকে নয়, গলার মাঝ থেকে বাতাস ছাড়ুন', '৩. পরিষ্কার স্বরে "হা" উচ্চারণ করুন'],
    stepsEn: ['1. Gently constrict the middle pharynx', '2. Exhale a smooth, warm breath', '3. Pronounce a pure pharyngeal "Haa"'],
    exampleWord: 'رَحْمَنُ',
    exampleMeaningBn: 'পরম করুণাময়',
    exampleMeaningEn: 'The Entirely Merciful'
  },
  {
    id: 7,
    arabic: 'خ',
    nameBn: 'খ',
    nameEn: 'Khaa',
    translit: 'kha',
    region: 'throat',
    regionLabelBn: 'আদনাল হালক (গলার উপরিভাগ)',
    regionLabelEn: 'Adna al-Halq (Upper Throat)',
    makhrajBn: 'গলার উপরের অংশ থেকে মোটা স্বরে উচ্চারিত হয়',
    makhrajEn: 'Articulated from the upper throat near the soft palate with a full, heavy tone',
    stepsBn: ['১. জিহ্বার গোড়া উপরের নরম তালুর কাছে আনুন', '২. গলার উপরিভাগে মৃদু ঘর্ষণ তৈরি করুন', '৩. মোটা স্বরে "খ" উচ্চারণ করুন'],
    stepsEn: ['1. Raise the back of the tongue toward the uvula', '2. Create a gentle velar friction', '3. Pronounce with a heavy, full mouth'],
    exampleWord: 'خَيْرٌ',
    exampleMeaningBn: 'কল্যাণ ও উত্তম',
    exampleMeaningEn: 'Goodness'
  },
  {
    id: 8,
    arabic: 'د',
    nameBn: 'দাল',
    nameEn: 'Daal',
    translit: 'da',
    region: 'tongue',
    regionLabelBn: 'জিহ্বার আগা',
    regionLabelEn: 'Tip of the Tongue',
    makhrajBn: 'জিহ্বার আগা সামনের উপরের দুই দাঁতের গোড়ার সাথে লাগিয়ে উচ্চারিত হয়',
    makhrajEn: 'Tip of the tongue touching the roots of the upper two front incisors',
    stepsBn: ['১. জিহ্বার আগা উপরের দাঁতের গোড়ায় স্পর্শ করুন', '২. স্পষ্টভাবে ধ্বনি ছেড়ে দিন', '৩. সাকিন অবস্থায় কলকলা (প্রতিধ্বনি) করুন'],
    stepsEn: ['1. Place tongue tip firmly at the upper incisor roots', '2. Release with a clear voiced stop', '3. Apply Qalqalah bounce when sukoon is present'],
    exampleWord: 'دِينٌ',
    exampleMeaningBn: 'জীবনবিধান',
    exampleMeaningEn: 'Way of life'
  },
  {
    id: 9,
    arabic: 'ذ',
    nameBn: 'যাল',
    nameEn: 'Dhaal',
    translit: 'dha',
    region: 'tongue',
    regionLabelBn: 'জিহ্বার আগা ও দাঁতের আগা',
    regionLabelEn: 'Tongue Tip & Teeth Edge',
    makhrajBn: 'জিহ্বার আগা সামনের উপরের দুই দাঁতের আগার সাথে লাগিয়ে নরমভাবে উচ্চারিত হয়',
    makhrajEn: 'Tip of the tongue touching the edge of the upper front teeth with voice',
    stepsBn: ['১. জিহ্বার আগা সামনের দাঁতের কিনারায় রাখুন', '২. শিস ছাড়া নরম গুনগুন ধ্বনি তুলুন', '৩. পাতলা স্বরে "যাল" বলুন'],
    stepsEn: ['1. Rest tongue tip lightly under the upper incisors', '2. Vibrate vocal cords without whistling', '3. Keep the sound soft and light'],
    exampleWord: 'ذِكْرٌ',
    exampleMeaningBn: 'স্মরণ ও উপদেশ',
    exampleMeaningEn: 'Remembrance'
  },
  {
    id: 10,
    arabic: 'ر',
    nameBn: 'র',
    nameEn: 'Raa',
    translit: 'ra',
    region: 'tongue',
    regionLabelBn: 'জিহ্বার আগার পিঠ',
    regionLabelEn: 'Tip & Top Edge of the Tongue',
    makhrajBn: 'জিহ্বার আগার পিঠ সামনের উপরের মাড়ির সাথে লাগিয়ে উচ্চারিত হয়',
    makhrajEn: 'Tip and upper surface of the tongue striking the anterior hard palate',
    stepsBn: ['১. জিহ্বার আগার পিঠ উপরের মাড়ির কাছে আনুন', '২. অতিরিক্ত কম্পন ছাড়া একবার স্পর্শ করুন', '৩. জবর বা পেশ হলে মোটা করে "র" বলুন'],
    stepsEn: ['1. Bring the top edge of the tongue tip to the gum ridge', '2. Tap once cleanly without excessive rolling', '3. Pronounce heavy with Fatha/Damma, light with Kasra'],
    exampleWord: 'رَبٌّ',
    exampleMeaningBn: 'প্রতিপালক',
    exampleMeaningEn: 'Sustainer & Lord'
  },
  {
    id: 11,
    arabic: 'ز',
    nameBn: 'ঝা',
    nameEn: 'Zaa',
    translit: 'za',
    region: 'tongue',
    regionLabelBn: 'জিহ্বার আগা ও নিচের দাঁত',
    regionLabelEn: 'Tongue Tip & Lower Incisors',
    makhrajBn: 'জিহ্বার আগা সামনের নিচের দুই দাঁতের আগার সাথে লাগিয়ে শিসসহ উচ্চারিত হয়',
    makhrajEn: 'Tip of the tongue near the lower front teeth with a voiced sibilant buzz',
    stepsBn: ['১. জিহ্বার আগা নিচের সামনের দাঁতের ভেতরের দিকে রাখুন', '২. উপরের ও নিচের দাঁত কাছাকাছি আনুন', '৩. স্পষ্ট শিস ও গুনগুন ধ্বনিতে "ঝা" বলুন'],
    stepsEn: ['1. Point tongue tip behind the lower front incisors', '2. Bring upper and lower teeth close together', '3. Produce a clear voiced buzzing sound'],
    exampleWord: 'زَكَاةٌ',
    exampleMeaningBn: 'পবিত্রতা ও যাকাত',
    exampleMeaningEn: 'Purification & Alms'
  },
  {
    id: 12,
    arabic: 'س',
    nameBn: 'সীন',
    nameEn: 'Seen',
    translit: 'sa',
    region: 'tongue',
    regionLabelBn: 'জিহ্বার আগা (সফীর হরফ)',
    regionLabelEn: 'Tongue Tip (Sibilant)',
    makhrajBn: 'জিহ্বার আগা সামনের নিচের দুই দাঁতের সাথে মিলিয়ে পাতলা শিসসহ উচ্চারিত হয়',
    makhrajEn: 'Tip of the tongue behind lower incisors producing a crisp, thin sibilant',
    stepsBn: ['১. জিহ্বার আগা নিচের দাঁতের কাছে স্থাপন করুন', '২. দাঁতের ফাঁক দিয়ে বাতাস প্রবাহিত করুন', '৩. পাতলা ও স্পষ্ট স্বরে "সীন" বলুন'],
    stepsEn: ['1. Rest tongue tip near the lower incisors', '2. Channel a steady stream of air through the teeth', '3. Keep the tone light and crisp'],
    exampleWord: 'سَلَامٌ',
    exampleMeaningBn: 'শান্তি ও নিরাপত্তা',
    exampleMeaningEn: 'Peace'
  },
  {
    id: 13,
    arabic: 'ش',
    nameBn: 'শীন',
    nameEn: 'Sheen',
    translit: 'sha',
    region: 'tongue',
    regionLabelBn: 'জিহ্বার মধ্যভাগ (তাফাশশী)',
    regionLabelEn: 'Middle of the Tongue (Spreading Air)',
    makhrajBn: 'জিহ্বার মধ্যভাগ তালুর কাছে এনে মুখের ভেতর বাতাস ছড়িয়ে উচ্চারিত হয়',
    makhrajEn: 'Middle of the tongue raised toward the palate while air spreads softly',
    stepsBn: ['১. জিহ্বার মাঝখান তালুর কাছাকাছি তুলুন', '২. মুখের ভেতর বাতাস প্রশস্তভাবে ছড়িয়ে দিন', '৩. নরম শিসসহ "শীন" উচ্চারণ করুন'],
    stepsEn: ['1. Raise the center of the tongue toward the roof of the mouth', '2. Allow the breath to diffuse across the palate', '3. Pronounce a warm, spreading "Sheen"'],
    exampleWord: 'شُكْرٌ',
    exampleMeaningBn: 'কৃতজ্ঞতা',
    exampleMeaningEn: 'Gratitude'
  },
  {
    id: 14,
    arabic: 'ص',
    nameBn: 'সদ',
    nameEn: 'Saad',
    translit: 'saa',
    region: 'tongue',
    regionLabelBn: 'জিহ্বার আগা (ইস্তি’লা মোটা হরফ)',
    regionLabelEn: 'Tongue Tip (Elevated Heavy Sibilant)',
    makhrajBn: 'জিহ্বার আগা নিচের দাঁতের সাথে রেখে জিহ্বার গোড়া উঁচু করে মোটা স্বরে উচ্চারিত হয়',
    makhrajEn: 'Tongue tip near lower incisors while the back of the tongue elevates for a full tone',
    stepsBn: ['১. জিহ্বার আগা নিচের দাঁতের কাছে রাখুন', '২. জিহ্বার পেছনের অংশ তালুর দিকে উঁচু করুন', '৩. গম্ভীর ও মোটা শিসসহ "সদ" বলুন'],
    stepsEn: ['1. Place tongue tip behind the lower front teeth', '2. Elevate the back of the tongue toward the soft palate', '3. Produce a resonant, heavy "Saad"'],
    exampleWord: 'صِرَاطٌ',
    exampleMeaningBn: 'সরল পথ',
    exampleMeaningEn: 'Straight path'
  },
  {
    id: 15,
    arabic: 'ض',
    nameBn: 'দদ',
    nameEn: 'Daad',
    translit: 'daa',
    region: 'tongue',
    regionLabelBn: 'জিহ্বার কিনারা ও মাড়ির দাঁত',
    regionLabelEn: 'Lateral Edge of Tongue & Upper Molars',
    makhrajBn: 'জিহ্বার এক বা উভয় পাশের কিনারা উপরের মাড়ির দাঁতের গোড়ার সাথে লাগিয়ে উচ্চারিত হয়',
    makhrajEn: 'Side edge of the tongue pressing against the inner surface of the upper molars',
    stepsBn: ['১. জিহ্বার বাম বা ডান পাশ উপরের মাড়ির দাঁতের সাথে লাগান', '২. জিহ্বার মাঝখান সামান্য নিচু রেখে বাতাস ধরে রাখুন', '৩. গম্ভীর ও মোটা স্বরে "দদ" উচ্চারণ করুন'],
    stepsEn: ['1. Press the side edge of the tongue against the upper molars', '2. Keep the back of the tongue elevated', '3. Release with a deep, full "Daad"'],
    exampleWord: 'فَضْلٌ',
    exampleMeaningBn: 'অনুগ্রহ ও দয়া',
    exampleMeaningEn: 'Bounty & Grace'
  },
  {
    id: 16,
    arabic: 'ط',
    nameBn: 'ত্ব',
    nameEn: 'Taa (Heavy)',
    translit: 'taa',
    region: 'tongue',
    regionLabelBn: 'জিহ্বার আগা (সবচেয়ে শক্তিশালী মোটা হরফ)',
    regionLabelEn: 'Tongue Tip (Emphatic Alveolar)',
    makhrajBn: 'জিহ্বার আগা সামনের উপরের দুই দাঁতের গোড়ার সাথে লাগিয়ে মোটা স্বরে উচ্চারিত হয়',
    makhrajEn: 'Tongue tip pressing the upper gum ridge while the back of the tongue is fully elevated',
    stepsBn: ['১. জিহ্বার আগা উপরের দাঁতের গোড়ায় দৃঢ়ভাবে লাগান', '২. জিহ্বার গোড়া তালুর দিকে উঁচু করুন', '৩. বাতাস ছাড়া গম্ভীর স্বরে "ত্ব" বলুন'],
    stepsEn: ['1. Press the tongue tip against the upper incisor roots', '2. Raise the posterior tongue high toward the palate', '3. Release cleanly without breathiness'],
    exampleWord: 'طَيِّبٌ',
    exampleMeaningBn: 'পবিত্র ও উত্তম',
    exampleMeaningEn: 'Pure & Wholesome'
  },
  {
    id: 17,
    arabic: 'ظ',
    nameBn: 'যোয়া',
    nameEn: 'Dhaa (Heavy)',
    translit: 'zhaa',
    region: 'tongue',
    regionLabelBn: 'জিহ্বার আগা ও দাঁতের আগা (মোটা স্বর)',
    regionLabelEn: 'Tongue Tip & Incisor Edge (Emphatic)',
    makhrajBn: 'জিহ্বার আগা সামনের উপরের দুই দাঁতের আগার সাথে লাগিয়ে মোটা স্বরে উচ্চারিত হয়',
    makhrajEn: 'Tip of the tongue touching the upper incisor edge with posterior tongue elevation',
    stepsBn: ['১. জিহ্বার আগা উপরের দাঁতের কিনারায় রাখুন', '২. জিহ্বার পেছনের অংশ উঁচু করে মুখ ভরাট করুন', '৩. মোটা ও নরম স্বরে "যোয়া" বলুন'],
    stepsEn: ['1. Touch tongue tip lightly to the upper teeth edge', '2. Elevate the back of the tongue', '3. Pronounce a warm, heavy voiced sound'],
    exampleWord: 'عَظِيمٌ',
    exampleMeaningBn: 'মহান ও সুমহান',
    exampleMeaningEn: 'Magnificent'
  },
  {
    id: 18,
    arabic: 'ع',
    nameBn: 'আইন',
    nameEn: 'Ayn',
    translit: 'aa',
    region: 'throat',
    regionLabelBn: 'ওয়াসাতুল হালক (গলার মধ্যভাগ)',
    regionLabelEn: 'Wasat al-Halq (Middle Throat)',
    makhrajBn: 'গলার ঠিক মধ্যভাগ থেকে গভীর ও স্পষ্ট স্বরে উচ্চারিত হয়',
    makhrajEn: 'Articulated from the middle pharynx by retracting the root of the tongue',
    stepsBn: ['১. গলার মধ্যভাগের পেশি সামান্য সংকুচিত করুন', '২. নাক দিয়ে আওয়াজ না নিয়ে গলার ভেতর থেকে তুলুন', '৩. গভীর স্বরে "আইন" উচ্চারণ করুন'],
    stepsEn: ['1. Gently engage the middle throat muscles', '2. Keep the sound oral and clear of nasalization', '3. Pronounce a resonant "Ayn"'],
    exampleWord: 'عِلْمٌ',
    exampleMeaningBn: 'জ্ঞান ও প্রজ্ঞা',
    exampleMeaningEn: 'Knowledge'
  },
  {
    id: 19,
    arabic: 'غ',
    nameBn: 'গইন',
    nameEn: 'Ghayn',
    translit: 'gha',
    region: 'throat',
    regionLabelBn: 'আদনাল হালক (গলার উপরিভাগ)',
    regionLabelEn: 'Adna al-Halq (Upper Throat)',
    makhrajBn: 'গলার উপরের অংশ থেকে মোটা ও গম্ভীর স্বরে উচ্চারিত হয়',
    makhrajEn: 'Articulated from the upper throat near the soft palate with a voiced resonance',
    stepsBn: ['১. গলার উপরের অংশে মৃদু কম্পন তৈরি করুন', '২. জিহ্বার গোড়া উঁচু রাখুন', '৩. ভরাট স্বরে "গইন" বলুন'],
    stepsEn: ['1. Engage the upper throat and soft palate', '2. Keep the back of the tongue elevated', '3. Pronounce a smooth, voiced "Ghayn"'],
    exampleWord: 'غَفُورٌ',
    exampleMeaningBn: 'অতি ক্ষমাশীল',
    exampleMeaningEn: 'All-Forgiving'
  },
  {
    id: 20,
    arabic: 'ف',
    nameBn: 'ফা',
    nameEn: 'Faa',
    translit: 'fa',
    region: 'lips',
    regionLabelBn: 'নিচের ঠোঁটের পেট ও উপরের দাঁত',
    regionLabelEn: 'Inner Lower Lip & Upper Incisors',
    makhrajBn: 'সামনের উপরের দুই দাঁতের আগা নিচের ঠোঁটের ভেজা অংশে লাগিয়ে উচ্চারিত হয়',
    makhrajEn: 'Edges of the upper two front teeth touching the moist inner surface of the lower lip',
    stepsBn: ['১. উপরের সামনের দাঁত নিচের ঠোঁটের ভেতরের অংশে ছোঁয়ান', '২. হালকা বাতাস প্রবাহিত করুন', '৩. স্পষ্ট স্বরে "ফা" বলুন'],
    stepsEn: ['1. Rest the upper front teeth lightly on the inner lower lip', '2. Release a gentle stream of breath', '3. Pronounce "Faa" clearly'],
    exampleWord: 'فَلَاحٌ',
    exampleMeaningBn: 'সফলতা ও কল্যাণ',
    exampleMeaningEn: 'Success'
  },
  {
    id: 21,
    arabic: 'ق',
    nameBn: 'ক্বফ',
    nameEn: 'Qaaf',
    translit: 'qa',
    region: 'tongue',
    regionLabelBn: 'আকসাল লিসান (জিহ্বার গোড়া ও নরম তালু)',
    regionLabelEn: 'Aqsa al-Lisan (Root of Tongue & Soft Palate)',
    makhrajBn: 'জিহ্বার একেবারে গোড়া উপরের নরম তালুর সাথে লাগিয়ে মোটা স্বরে উচ্চারিত হয়',
    makhrajEn: 'Deepest root of the tongue pressing against the soft palate and uvula',
    stepsBn: ['১. জিহ্বার গোড়া উপরের নরম তালুতে স্পর্শ করুন', '২. মুখের ভেতর পূর্ণ গম্ভীর ধ্বনি তৈরি করুন', '৩. মোটা স্বরে "ক্বফ" উচ্চারণ করুন'],
    stepsEn: ['1. Raise the deepest part of the tongue to the soft palate', '2. Release with a deep, round resonance', '3. Apply Qalqalah bounce when sukoon is present'],
    exampleWord: 'قَلَمٌ',
    exampleMeaningBn: 'কলম',
    exampleMeaningEn: 'The Pen'
  },
  {
    id: 22,
    arabic: 'ك',
    nameBn: 'কাফ',
    nameEn: 'Kaaf',
    translit: 'ka',
    region: 'tongue',
    regionLabelBn: 'জিহ্বার গোড়ার সামান্য সামনে',
    regionLabelEn: 'Back of the Tongue & Hard Palate Border',
    makhrajBn: 'ক্বফের মাখরাজের সামান্য সামনে থেকে পাতলা স্বরে উচ্চারিত হয়',
    makhrajEn: 'Back of the tongue touching the junction of the hard and soft palate',
    stepsBn: ['১. জিহ্বার পেছনের অংশ শক্ত ও নরম তালুর সংযোগস্থলে লাগান', '২. হালকা বাতাসসহ ধ্বনি ছাড়ুন', '৩. পাতলা স্বরে "কাফ" বলুন'],
    stepsEn: ['1. Touch the back of the tongue slightly forward of Qaaf', '2. Release with a subtle breath (Hams)', '3. Keep the tone light and crisp'],
    exampleWord: 'كِتَابٌ',
    exampleMeaningBn: 'কিতাব বা গ্রন্থ',
    exampleMeaningEn: 'The Book'
  },
  {
    id: 23,
    arabic: 'ل',
    nameBn: 'লাম',
    nameEn: 'Laam',
    translit: 'la',
    region: 'tongue',
    regionLabelBn: 'জিহ্বার সামনের কিনারা',
    regionLabelEn: 'Front Lateral Edge of the Tongue',
    makhrajBn: 'জিহ্বার সামনের কিনারা উপরের সামনের মাড়ির সাথে লাগিয়ে উচ্চারিত হয়',
    makhrajEn: 'Front edges and tip of the tongue pressing against the upper alveolar ridge',
    stepsBn: ['১. জিহ্বার সামনের কিনারা উপরের মাড়িতে স্পর্শ করুন', '২. পাশ দিয়ে স্বর প্রবাহিত হতে দিন', '৩. স্পষ্ট স্বরে "লাম" উচ্চারণ করুন'],
    stepsEn: ['1. Place the front edge of the tongue on the upper gum ridge', '2. Allow sound to flow smoothly around the sides', '3. Pronounce a clear "Laam"'],
    exampleWord: 'لُطْفٌ',
    exampleMeaningBn: 'কোমলতা ও অনুগ্রহ',
    exampleMeaningEn: 'Kindness'
  },
  {
    id: 24,
    arabic: 'م',
    nameBn: 'মীম',
    nameEn: 'Meem',
    translit: 'ma',
    region: 'lips',
    regionLabelBn: 'আশ-শাফাতাইন ও খাইশুম',
    regionLabelEn: 'Both Lips & Nasal Passage',
    makhrajBn: 'দুই ঠোঁটের শুকনো অংশ মিলিয়ে এবং নাকের বাঁশির সাহায্যে উচ্চারিত হয়',
    makhrajEn: 'Outer dry edges of both lips closing together accompanied by nasal resonance',
    stepsBn: ['১. দুই ঠোঁট স্বাভাবিকভাবে বন্ধ করুন', '২. নাকের বাঁশি থেকে মৃদু গুন্নাহ ধ্বনি তুলুন', '৩. তিন আলিফ পরিমাণ "মীম" টেনে পড়ুন'],
    stepsEn: ['1. Close both lips gently together', '2. Let a warm nasal resonance (Ghunnah) accompany the sound', '3. Pronounce "Meem" smoothly'],
    exampleWord: 'مَسْجِدٌ',
    exampleMeaningBn: 'মসজিদ (সিজদার স্থান)',
    exampleMeaningEn: 'Place of prostration'
  },
  {
    id: 25,
    arabic: 'ن',
    nameBn: 'নূন',
    nameEn: 'Noon',
    translit: 'na',
    region: 'nasal',
    regionLabelBn: 'জিহ্বার আগা ও খাইশুম (নাকের বাঁশি)',
    regionLabelEn: 'Tongue Tip & Al-Khayshoom (Nasal Cavity)',
    makhrajBn: 'জিহ্বার আগা উপরের মাড়িতে লাগিয়ে এবং নাকের বাঁশির গুন্নাহসহ উচ্চারিত হয়',
    makhrajEn: 'Tip of the tongue touching the upper gums accompanied by nasal resonance',
    stepsBn: ['১. জিহ্বার আগা উপরের মাড়ির সাথে স্পর্শ করুন', '২. নাকের বাঁশিতে মৃদু গুন্নাহ অনুভব করুন', '৩. স্পষ্ট স্বরে "নূন" বলুন'],
    stepsEn: ['1. Touch the tongue tip to the upper gum ridge', '2. Allow natural resonance through the nasal passage', '3. Pronounce a clear "Noon"'],
    exampleWord: 'نُورٌ',
    exampleMeaningBn: 'আলো ও জ্যোতি',
    exampleMeaningEn: 'Light'
  },
  {
    id: 26,
    arabic: 'و',
    nameBn: 'ওয়াও',
    nameEn: 'Waaw',
    translit: 'wa',
    region: 'lips',
    regionLabelBn: 'দুই ঠোঁট গোল করে',
    regionLabelEn: 'Rounding Both Lips',
    makhrajBn: 'দুই ঠোঁট গোল করে সামনে বাড়িয়ে উচ্চারিত হয়',
    makhrajEn: 'Articulated by rounding both lips into a circle while leaving a central opening',
    stepsBn: ['১. দুই ঠোঁট সুন্দরভাবে গোল করুন', '২. ঠোঁট না লাগিয়ে মাঝখান দিয়ে ধ্বনি বের করুন', '৩. স্পষ্ট স্বরে "ওয়াও" উচ্চারণ করুন'],
    stepsEn: ['1. Round both lips forward symmetrically', '2. Keep a small opening in the center of the lips', '3. Pronounce a smooth "Waaw"'],
    exampleWord: 'وُضُوءٌ',
    exampleMeaningBn: 'পবিত্রতা ও ওযু',
    exampleMeaningEn: 'Ablution & Purity'
  },
  {
    id: 27,
    arabic: 'ه',
    nameBn: 'হা (গোল হা)',
    nameEn: 'Haa (Deep)',
    translit: 'haa',
    region: 'throat',
    regionLabelBn: 'আকসাল হালক (গলার সর্বনিম্ন ভাগ)',
    regionLabelEn: 'Aqsa al-Halq (Deepest Throat)',
    makhrajBn: 'বুকের কাছাকাছি গলার সবচেয়ে নিচের অংশ থেকে উচ্চারিত হয়',
    makhrajEn: 'Articulated from the lowest part of the throat closest to the chest',
    stepsBn: ['১. গলার একেবারে নিচের অংশ থেকে শ্বাস তুলুন', '২. কোনো ঘর্ষণ ছাড়া গভীর বাতাস ছাড়ুন', '৩. গম্ভীর স্বরে "হা" বলুন'],
    stepsEn: ['1. Draw breath from the lowest laryngeal region', '2. Release a deep, open aspiration', '3. Keep the throat relaxed and resonant'],
    exampleWord: 'هُدًى',
    exampleMeaningBn: 'হিদায়াত ও পথনির্দেশ',
    exampleMeaningEn: 'Guidance'
  },
  {
    id: 28,
    arabic: 'ء',
    nameBn: 'হামযাহ',
    nameEn: 'Hamzah',
    translit: 'a',
    region: 'throat',
    regionLabelBn: 'আকসাল হালক (গলার সর্বনিম্ন ভাগ)',
    regionLabelEn: 'Aqsa al-Halq (Glottal Stop)',
    makhrajBn: 'গলার সর্বনিম্ন অংশে স্বরতন্ত্রী বন্ধ ও খুলে স্পষ্টভাবে উচ্চারিত হয়',
    makhrajEn: 'Articulated at the glottis by briefly closing and releasing the vocal cords',
    stepsBn: ['১. গলার নিচের অংশে শ্বাস মুহূর্তের জন্য থামান', '২. তৎক্ষণাৎ স্পষ্ট ধ্বনিতে ছেড়ে দিন', '৩. কেটে কেটে স্পষ্টভাবে "হামযাহ" বলুন'],
    stepsEn: ['1. Briefly close the vocal cords at the base of the throat', '2. Release cleanly into the vowel sound', '3. Pronounce a crisp glottal stop'],
    exampleWord: 'إِيمَانٌ',
    exampleMeaningBn: 'ঈমান ও বিশ্বাস',
    exampleMeaningEn: 'Faith'
  },
  {
    id: 29,
    arabic: 'ي',
    nameBn: 'ইয়া',
    nameEn: 'Yaa',
    translit: 'ya',
    region: 'tongue',
    regionLabelBn: 'জিহ্বার মধ্যভাগ ও তালু',
    regionLabelEn: 'Middle of the Tongue & Hard Palate',
    makhrajBn: 'জিহ্বার মধ্যভাগ উপরের তালুর কাছে এনে নরমভাবে উচ্চারিত হয়',
    makhrajEn: 'Middle of the tongue rising toward the hard palate without closing the airway',
    stepsBn: ['১. জিহ্বার মাঝখান তালুর কাছাকাছি তুলুন', '২. তালুতে শক্তভাবে না লাগিয়ে ধ্বনি প্রবাহিত করুন', '৩. কোমল স্বরে "ইয়া" বলুন'],
    stepsEn: ['1. Raise the middle of the tongue close to the hard palate', '2. Keep a smooth channel for the voiced sound', '3. Pronounce a clear, gentle "Yaa"'],
    exampleWord: 'يَقِينٌ',
    exampleMeaningBn: 'দৃঢ় বিশ্বাস',
    exampleMeaningEn: 'Certainty'
  }
];

export interface FeatureItem {
  id: string;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  detailBn: string;
  detailEn: string;
  targetSection: string;
  actionLabelBn: string;
  actionLabelEn: string;
  arabicGlyph: string;
}

export const CORE_FEATURES: FeatureItem[] = [
  {
    id: 'step-by-step',
    titleBn: 'ধাপে ধাপে পাঠ',
    titleEn: 'Step-by-step lessons',
    descBn: 'নূরানী কায়দার প্রতিটি পাঠ সুন্দরভাবে সাজানো। সহজ থেকে কঠিন : ধীরে ধীরে এগিয়ে যান।',
    descEn: 'Every Noorani Qaida lesson is carefully arranged. Progress gradually from easy to advanced.',
    detailBn: 'পাঠ ১ (২৯ হরফ) থেকে পাঠ ৩০ পর্যন্ত মাখরাজ, হরকত, তানভীন, যুক্ত হরফ ও তাজবীদ নিয়ম।',
    detailEn: 'From Lesson 1 (29 Huruf) to Lesson 30 covering Makhraj, Harakat, Tanween, connected letters, and Tajweed.',
    targetSection: 'lessons',
    actionLabelBn: 'পাঠ ১ দেখুন',
    actionLabelEn: 'Explore Lesson 1',
    arabicGlyph: 'ا ب ت'
  },
  {
    id: 'writing-board',
    titleBn: 'আরবি রাইটিং বোর্ড',
    titleEn: 'Arabic writing board',
    descBn: 'টাচ স্ক্রিনে আরবি লেখা অনুশীলন করুন। ট্রেসিং মোডে অক্ষর ফলো করুন।',
    descEn: 'Practice Arabic writing on a touchscreen. Follow the letters in tracing mode.',
    detailBn: '৪ ধরনের ক্যালিগ্রাফি নিব, ডান থেকে বাম (RTL) ট্রেসিং গাইড, নিজের লেখা রিপ্লে এবং ১০০ পেজ পর্যন্ত PDF এক্সপোর্ট।',
    detailEn: '4 calligraphy nib styles, right-to-left (RTL) tracing guide, live stroke replay, and up to 100 pages of PDF export.',
    targetSection: 'writing',
    actionLabelBn: 'বোর্ডে লিখুন',
    actionLabelEn: 'Try Writing Board',
    arabicGlyph: 'قَلَمٌ'
  },
  {
    id: 'audio-pronunciation',
    titleBn: 'অডিও সহ উচ্চারণ',
    titleEn: 'Audio pronunciation',
    descBn: 'প্রতিটি হরফ ও শব্দের সঠিক উচ্চারণ শুনুন। বারবার শুনে অনুশীলন করুন।',
    descEn: 'Listen to the correct pronunciation of each letter and word. Listen repeatedly and practice.',
    detailBn: 'ধীর, স্বাভাবিক ও দ্রুত গতিতে উচ্চারণ শোনা এবং ১ থেকে ৩ বার স্বয়ংক্রিয় পুনরাবৃত্তি সুবিধা।',
    detailEn: 'Listen at slow, normal, or fast speeds with 1x to 3x automatic pronunciation repetition.',
    targetSection: 'lessons',
    actionLabelBn: 'উচ্চারণ শুনুন',
    actionLabelEn: 'Listen to Huruf',
    arabicGlyph: 'صَوْتٌ'
  },
  {
    id: 'quizzes-tests',
    titleBn: 'কুইজ ও পরীক্ষা',
    titleEn: 'Quizzes and tests',
    descBn: 'প্রতিটি পাঠ শেষে কুইজ দিন। নিজের শেখা যাচাই করুন।',
    descEn: 'Take a quiz after every lesson. Check your own learning.',
    detailBn: 'মাখরাজ শনাক্তকরণ, হরফ চেনা এবং উচ্চারণের ধাপ যাচাইয়ের মাধ্যমে তাৎক্ষণিক ফলাফল ও স্কোর।',
    detailEn: 'Instant feedback and scoring through Makhraj identification, letter recognition, and articulation checks.',
    targetSection: 'portals',
    actionLabelBn: 'কুইজ প্রিভিউ',
    actionLabelEn: 'Preview Quiz',
    arabicGlyph: 'فَوْزٌ'
  },
  {
    id: 'classroom-system',
    titleBn: 'ক্লাসরুম সিস্টেম',
    titleEn: 'Classroom system',
    descBn: 'শিক্ষক ক্লাস তৈরি করুন, ছাত্ররা কোড দিয়ে যোগ দিন। হোমওয়ার্ক দিন ও নিন।',
    descEn: 'Teachers create classes and students join with a code. Set and submit homework.',
    detailBn: 'ব্যাচ কোড (যেমন Q7KM, R3NP, X5BT) দিয়ে মুহূর্তেই ক্লাসরুমে যুক্ত হওয়া এবং স্মার্টবোর্ড প্রেজেন্টেশন মোড।',
    detailEn: 'Instant classroom enrollment via 4-character batch codes (Q7KM, R3NP, X5BT) and Smartboard presentation mode.',
    targetSection: 'portals',
    actionLabelBn: 'ক্লাসরুম দেখুন',
    actionLabelEn: 'Open Classroom',
    arabicGlyph: 'حَلْقَةٌ'
  },
  {
    id: 'progress-tracking',
    titleBn: 'অগ্রগতি ট্র্যাকিং',
    titleEn: 'Progress tracking',
    descBn: 'কতটুকু শিখলেন তা দেখুন। শিক্ষক ছাত্রদের অগ্রগতি দেখতে পারেন।',
    descEn: 'See how much you have learned. Teachers can view student progress.',
    detailBn: 'সম্পন্ন পাঠ, গড় কুইজ স্কোর, প্রতিদিনের ধারাবাহিক স্ট্রিক এবং পুরো ব্যাচের অগ্রগতি বিশ্লেষণ।',
    detailEn: 'Track completed lessons, average quiz scores, daily learning streaks, and batch-wide mastery analytics.',
    targetSection: 'portals',
    actionLabelBn: 'অগ্রগতি দেখুন',
    actionLabelEn: 'View Progress',
    arabicGlyph: 'مِيزَانٌ'
  }
];

export interface PricingPlan {
  id: 'free' | 'student_pro' | 'teacher_pro';
  nameBn: string;
  nameEn: string;
  badge?: string;
  priceBn: string;
  priceEn: string;
  rawPriceBdt: number;
  durationBn: string;
  durationEn: string;
  featuresBn: string[];
  featuresEn: string[];
  noteBn: string;
  noteEn: string;
  ctaBn: string;
  ctaEn: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    nameBn: 'Free',
    nameEn: 'Free',
    priceBn: '০৳',
    priceEn: '0 BDT',
    rawPriceBdt: 0,
    durationBn: 'বিনামূল্যে',
    durationEn: 'Free forever',
    featuresBn: [
      'Admin নির্ধারিত বিনামূল্যের পাঠ',
      'Student portal-এ free learning',
      'কোড দিয়ে শিক্ষকের class-এ যোগ দিন'
    ],
    featuresEn: [
      'Admin-designated free lessons',
      'Free learning in Student portal',
      'Join teacher classes with a class code'
    ],
    noteBn: 'Arabic Writing board ও Teacher portal অন্তর্ভুক্ত নয়।',
    noteEn: 'Arabic Writing board and Teacher portal are not included.',
    ctaBn: 'শেখা শুরু করুন',
    ctaEn: 'Start learning'
  },
  {
    id: 'student_pro',
    nameBn: 'Student Pro',
    nameEn: 'Student Pro',
    badge: 'Pro',
    priceBn: '৫০০৳',
    priceEn: '500 BDT',
    rawPriceBdt: 500,
    durationBn: '60 দিনের জন্য',
    durationEn: 'For 60 days',
    featuresBn: [
      'সব পাঠ ও সম্পূর্ণ learning access',
      'Arabic Writing board (১০০ পেজ ও PDF এক্সপোর্ট)',
      'কোড দিয়ে class-এ যোগ দিন'
    ],
    featuresEn: [
      'All 30 lessons and complete learning access',
      'Arabic Writing board (100 pages & PDF export)',
      'Join classes with a class code'
    ],
    noteBn: 'Teacher portal বা class তৈরি অন্তর্ভুক্ত নয়।',
    noteEn: 'Teacher portal or class creation is not included.',
    ctaBn: 'নির্বাচিত প্ল্যান',
    ctaEn: 'Selected Plan'
  },
  {
    id: 'teacher_pro',
    nameBn: 'Teacher Pro',
    nameEn: 'Teacher Pro',
    badge: 'Pro',
    priceBn: '১,০০০৳',
    priceEn: '1,000 BDT',
    rawPriceBdt: 1000,
    durationBn: '60 দিনের জন্য',
    durationEn: 'For 60 days',
    featuresBn: [
      'Student Pro-এর সব সুবিধা',
      'Teacher portal ও class management',
      'Class তৈরি, join code ও homework'
    ],
    featuresEn: [
      'Everything included in Student Pro',
      'Teacher portal and full class management',
      'Create classes, join codes, and homework'
    ],
    noteBn: 'Class পরিচালনার একমাত্র paid plan।',
    noteEn: 'The dedicated plan for classroom teachers and institutions.',
    ctaBn: 'এই প্ল্যান বেছে নিন',
    ctaEn: 'Choose this plan'
  }
];

export const ACCESS_RULES_BN = [
  'Free account Admin নির্ধারিত পাঠ শিখতে পারবে এবং বিনামূল্যে class-এ যোগ দিতে পারবে।',
  'Student Pro-তে সব পাঠ ও Arabic Writing board থাকবে।',
  'Teacher portal ও class পরিচালনার জন্য Teacher Pro প্রয়োজন।',
  'Class-এ যোগ দিলে শিক্ষকের Teacher Pro সক্রিয় থাকা পর্যন্ত সব পাঠ খুলবে। Admin class থেকে Writing board access চালু বা বন্ধ করতে পারবেন।',
  'Smartboard বলতে Lesson-এর Teaching/presentation mode বোঝায়; এটি Admin আলাদাভাবে Free বা Pro করতে পারবেন।',
  'Subscription শেষ হলে saved progress ও class membership রেখে Free access ফিরে আসবে।'
];

export const ACCESS_RULES_EN = [
  'Free accounts can study Admin-designated free lessons and join classes with a code at no cost.',
  'Student Pro unlocks all 30 lessons and the full Arabic Writing Board workspace.',
  'Teacher Pro is required for the Teacher Portal and managing student batches.',
  'Joining a class unlocks all lessons while the teacher’s Teacher Pro plan remains active. Admins can toggle Writing Board access per class.',
  'Smartboard refers to the Lesson Teaching/Presentation mode, which Admins can configure as Free or Pro.',
  'When a subscription expires, your saved progress and class membership remain intact while returning to Free access.'
];

// ============================================================================
// Pure Decoupled Logic Functions (Scroll-Craft Math & Form Validation)
// ============================================================================

export function clamp(val: number, min: number, max: number): number {
  return val < min ? min : val > max ? max : val;
}

export function clamp01(val: number): number {
  return clamp(val, 0, 1);
}

export function smoothStep(val: number): number {
  const x = clamp01(val);
  return x * x * (3 - 2 * x);
}

/**
 * Scroll-Craft Monotone Dwell Remap:
 * Settles the camera mid-act (where the copy peaks) and moves quicker at the edges.
 * Guarantees f(0) = 0 and f(1) = 1.
 */
export function dwellEase(progress: number, dwellFactor: number): number {
  const x = clamp01(progress);
  if (!dwellFactor || dwellFactor <= 0) return x;
  const L = clamp(dwellFactor, 0, 0.6);
  const c = x - 0.5;
  return (1 - L) * x + L * (4 * c * c * c + 0.5);
}

/**
 * Scroll-Craft Cue Plateau Calculator:
 * Computes opacity (0..1) across a [from, to] progress window with rampIn and rampOut fractions.
 */
export function cueOpacity(
  progress: number,
  from: number,
  to: number | null = null,
  rampIn = 0.3,
  rampOut = 0.3
): number {
  const p = clamp01(progress);
  if (to === null) {
    return smoothStep((p - from) / 0.18);
  }
  const win = Math.max(to - from, 0.001);
  const inEnd = from + win * clamp01(rampIn);
  const outStart = to - win * clamp01(rampOut);
  if (p < from) return 0;
  if (p < inEnd) return smoothStep((p - from) / Math.max(inEnd - from, 0.001));
  if (p <= outStart) return 1;
  if (p <= to) return smoothStep(1 - (p - outStart) / Math.max(to - outStart, 0.001));
  return 0;
}

/**
 * Discount coupon preview calculator for Student Pro (500 BDT) & Teacher Pro (1000 BDT)
 */
export function calculateCouponPreview(
  planId: 'free' | 'student_pro' | 'teacher_pro',
  couponCode: string
): { originalBdt: number; discountPercent: number; finalBdt: number; valid: boolean; labelEn: string; labelBn: string } {
  const plan = PRICING_PLANS.find((p) => p.id === planId) || PRICING_PLANS[1];
  const base = plan.rawPriceBdt;
  const normalized = couponCode.trim().toUpperCase();
  if (!normalized) {
    return {
      originalBdt: base,
      discountPercent: 0,
      finalBdt: base,
      valid: false,
      labelEn: 'Enter a coupon code to preview discounted price.',
      labelBn: 'ছাড়ের মূল্য দেখতে একটি কুপন কোড লিখুন।'
    };
  }
  const coupons: Record<string, number> = {
    UMMAH20: 20,
    QAIDA25: 25,
    MADRASA50: 50,
    RAMADAN30: 30
  };
  const pct = coupons[normalized] || 0;
  if (pct === 0) {
    return {
      originalBdt: base,
      discountPercent: 0,
      finalBdt: base,
      valid: false,
      labelEn: `Coupon "${normalized}" not recognized. Try UMMAH20 or QAIDA25.`,
      labelBn: `"${normalized}" কুপনটি পাওয়া যায়নি। UMMAH20 বা QAIDA25 ব্যবহার করে দেখুন।`
    };
  }
  const finalBdt = Math.round(base * (1 - pct / 100));
  return {
    originalBdt: base,
    discountPercent: pct,
    finalBdt,
    valid: true,
    labelEn: `${pct}% discount applied: ${finalBdt} BDT for 60 days (Preview only)`,
    labelBn: `${pct}% ছাড় প্রযোজ্য: ৬০ দিনের জন্য ${finalBdt}৳ (শুধু প্রিভিউ)`
  };
}

export interface ComplaintInput {
  issueType: string;
  location: string;
  details: string;
  contactEmail: string;
}

export function validateComplaintForm(input: ComplaintInput, lang: Language = 'bn'): { valid: boolean; error?: string } {
  if (!input.issueType.trim()) {
    return {
      valid: false,
      error: lang === 'bn' ? 'অনুগ্রহ করে অভিযোগের ধরন বেছে নিন।' : 'Please choose an issue type.'
    };
  }
  if (!input.details || input.details.trim().length < 12) {
    return {
      valid: false,
      error:
        lang === 'bn'
          ? 'সমস্যাটি ও আপনার প্রত্যাশা কমপক্ষে ১২টি অক্ষরে বিস্তারিত লিখুন।'
          : 'Please describe the issue in at least 12 characters.'
    };
  }
  if (input.contactEmail && input.contactEmail.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.contactEmail.trim())) {
      return {
        valid: false,
        error: lang === 'bn' ? 'অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা লিখুন।' : 'Please enter a valid contact email address.'
      };
    }
  }
  return { valid: true };
}

export function filterLettersByRegion(
  region: 'all' | 'throat' | 'tongue' | 'lips' | 'nasal' | 'empty'
): ArabicLetterItem[] {
  if (region === 'all') return ARABIC_LETTERS;
  return ARABIC_LETTERS.filter((item) => item.region === region);
}
