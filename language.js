// BioNova EN / KA language switcher
(function () {

  window.BIONOVA_PHRASES = {
    en: [
      'Farm-ready biodigesters with real-time control.',
      'Turn waste into clean energy and revenue.',
      'Up to 3× cheaper than alternatives.',
      'IoT monitoring from anywhere, anytime.',
    ],
    ka: [
      'ფერმებზე მორგებული ბიოდიჯესტერები, რეალურ დროში კონტროლით.',
      'აქციეთ ნარჩენები სუფთა ენერგიად და შემოსავლად.',
      'ალტერნატივებზე 3-ჯერ უფრო იაფი.',
      'IoT მონიტორინგი ნებისმიერი ადგილიდან, ნებისმიერ დროს.',
    ],
  };

  /* ─────────────────────────────────────────────────────────────
     TRANSLATIONS
  ───────────────────────────────────────────────────────────── */
  const T = {
    en: {
      /* NAV */
      'nav.about':    'What We Do',
      'nav.why':      'Why BioNova',
      'nav.how':      'How It Works',
      'nav.pricing':  'Pricing',
      'nav.savings':  'Savings',
      'nav.wins':     'Our Wins',
      'nav.blog':     'Blog',
      'nav.team':     'Team',
      'nav.partners': 'Partners',
      'nav.contact':  'Contact',

      /* HERO */
      'hero.title': 'Welcome to BioNova',
      'hero.cta1':  "Why we're different",
      'hero.cta2':  'See pricing',

      /* ABOUT */
      'about.eyebrow': 'Our Mission',
      'about.h2':  'What We Do',
      'about.p':   'BioNova builds modular, smart, farm-ready biodigesters that convert manure and food waste into biogas, electricity, and high-value bio-fertilizer. Our compact systems are built from smart, durable materials and come with an IoT app so farmers can monitor output, savings, and system health from anywhere.',
      'about.tagline': 'In short: <strong>Clean energy + new revenue + remote control</strong> Purpose-built for farms.',
      'about.chip.renewable': 'Renewable Energy',
      'about.chip.farm':      'Farm-Ready',
      'about.chip.app':       'App Included',
      'about.chip.iot':       'IoT Monitored',
      'about.stat.affordable': 'More affordable<br>vs competitors',
      'about.stat.revenue':    'Revenue<br>streams',
      'about.stat.monitoring': 'Remote<br>monitoring',
      'about.pill.gas':  'Biogas',
      'about.pill.elec': 'Electricity',
      'about.pill.fert': 'Bio-Fertilizer',
      'about.iot':       'Live monitoring active',

      /* WHY */
      'why.h2':    'Why BioNova Is Different',
      'why.c1.h3': 'Designed for Farmers',
      'why.c1.p':  'Compact footprint, manure-first design, and easy access to service points. Works on small and mid-size farms without civil-engineering headaches.',
      'why.c2.h3': 'Up to <span class="highlight">3× more affordable</span>',
      'why.c2.p':  'We use cost-efficient, corrosion-resistant materials and optimized fabrication to cut CAPEX — without compromising durability.',
      'why.c3.h3': 'LEGO-Style Setup',
      'why.c3.p':  'Ships as pre-fabricated modules with quick-connect piping and color-coded ports. Most installs are done in days, not weeks.',
      'why.c4.h3': 'Full App Control',
      'why.c4.p':  'Monitor gas, electricity, and fertilizer production, track savings, plan maintenance, and get alerts — from any device, anywhere.',
      'why.proof1': 'Lower up-front cost',
      'why.proof2': 'Faster commissioning',
      'why.proof3': 'Data-driven ROI',
      'why.proof4': 'Easy maintenance',

      /* APP */
      'app.h2': 'The BioNova App',
      'app.p':  "Every BioNova unit ships with our monitoring & analytics app. Farmers see real-time production, savings, uptime and can share reports with co-ops, banks, and partners.",
      'app.li1': 'Biogas, electricity & fertilizer dashboards',
      'app.li2': 'Smart alerts for pH, temperature & feed rate',
      'app.li3': 'Savings & revenue tracking',
      'app.li4': 'Secure cloud access from any device',
      'app.kpi.gas':  'm³ biogas / day',
      'app.kpi.elec': 'kWh electricity / day',
      'app.kpi.fert': 'liters fertilizer / day',
      'app.cta':      'Estimate your savings',

      /* SETUP */
      'setup.h2':   'Setup in 4 Steps',
      'setup.1.h4': '1. Deliver',
      'setup.1.p':  'Pre-fabricated modules arrive on site.',
      'setup.2.h4': '2. Connect',
      'setup.2.p':  'Quick-connect pipes & color-coded ports.',
      'setup.3.h4': '3. Start Up',
      'setup.3.p':  'Guided commissioning via the app.',
      'setup.4.h4': '4. Monitor',
      'setup.4.p':  'Track output, savings, and maintenance.',

      /* HOW IT WORKS */
      'hiw.badge':   'The Process',
      'hiw.h2':      'How Does It Work?',
      'hiw.sub':     'From farm waste to clean energy in three simple stages.',
      'hiw.s1.h3':   'Organic Waste Input',
      'hiw.s1.p':    'Manure and food waste collected daily from your livestock',
      'hiw.s1.stat': '20–30 kg/animal/day',
      'hiw.arrow1':  'feeds into',
      'hiw.s2.h3':   'BioNova Digester',
      'hiw.s2.p':    'Smart anaerobic digestion installed directly on your farm, which converts waste into energy. Monitored 24/7 via our app',
      'hiw.s2.stat1':'30-ton capacity',
      'hiw.s2.stat2':'IoT monitored',
      'hiw.arrow2':  'produces',
      'hiw.out.elec':'Gas & Electricity',
      'hiw.out.fert':'Bio-Fertilizer',
      'hiw.out.h3':  '3 Revenue Streams',
      'hiw.out.p':   'Every unit generates clean energy <em>and</em> high-value liquid fertilizer simultaneously',

      /* PRICING */
      'price.h2':         'Pricing',
      'price.sub':        'Choose the model that fits your cash flow today.',
      'price.c1.h3':      'Buy Outright',
      'price.c1.p':       'Pay full price. Keep 100% of your electricity & fertilizer revenue.',
      'price.popular':    'Most popular',
      'price.soon':       'Coming Soon',
      'price.indev':      'In Development',
      'price.est':        'estimated',
      'price.li.output':  'Higher output',
      'price.li.app':     'Remote monitoring app',
      'price.li.own':     'Full ownership',
      'price.li.maxout':  'Maximum output for large farms',
      'price.li.proto':   'Actively prototyping now',
      'price.li.same':    'Same hardware & app',
      'price.li.elec15':  'Keep 100% of your electricity revenue',
      'price.li.fert45':  'We collect & sell your bio-fertilizer',
      'price.li.fertearn': 'Earn a share of fertilizer sales',
      'price.btn.choose': 'Choose plan',
      'price.btn.notify': 'Notify me',
      'price.btn.partner':'Partner with us',
      'price.c2.h3':      'Partner With BioNova',
      'price.c2.p':       'Get your digester at <strong>half the price</strong>. BioNova handles your bio-fertilizer — we collect, market &amp; sell it on your behalf. You earn a share of every sale, effortlessly.',
      'price.fine':       '*BioNova collects, processes and markets your bio-fertilizer on your behalf. You receive a share of net fertilizer sales revenue. Farmers may retain a portion for personal use. You keep 100% of electricity revenue. Exact terms are finalized during contracting.',
      'price.roadmap':    "We're scaling up. The 50-ton digester is currently in active prototyping — <a href=\"#contact\">get in touch</a> to stay updated or discuss larger custom installations.",

      /* CALCULATOR */
      'calc.h2':          'Estimate Your Savings',
      'calc.desc':        'Pick your herd size and tariff. We\'ll do the rest. (<a href="#" id="toggleAdvancedLink">Advanced</a> for engineers.)',
      'calc.lbl.animal':  'Animal',
      'calc.btn.cows':    'Cows',
      'calc.btn.buffalo': 'Buffalo',
      'calc.btn.pigs':    'Pigs',
      'calc.btn.mixed':   'Mixed',
      'calc.hint.animal': 'We load typical manure & gas yields per animal.',
      'calc.lbl.herd':    'Herd size',
      'calc.unit.animals':'animals',
      'calc.hint.herd':   'Drag to match your farm.',
      'calc.lbl.tariff':  'Electricity price',
      'calc.unit.kwh':    'per kWh',
      'calc.hint.tariff': 'Use your grid tariff or PPA price.',
      'calc.lbl.model':   'Model',
      'calc.btn.buy':     'Buy outright',
      'calc.btn.partner': 'Partner with us',
      'calc.hint.model':  'Partner = 50% upfront. BioNova manages & sells your bio-fertilizer for you.',
      'calc.res.biogas':  'Daily Biogas',
      'calc.res.elec':    'Daily Electricity',
      'calc.res.save':    'Daily Savings',
      'calc.res.reco':    'Recommended Digester',
      'calc.reco.hint':   'We size this from your herd.',
      'calc.res.capex':   'Upfront Cost',
      'calc.capex.hint':  'Partner model shows 50% upfront.',
      'calc.res.payback': 'Payback (simple)',
      'calc.payback.hint':'Based on energy savings only.',
      'calc.adv.summary': 'Advanced assumptions',
      'calc.adv.m.lbl':   'Manure per animal (kg/day)',
      'calc.adv.m.small': 'Typical cows: 20–30',
      'calc.adv.y.lbl':   'Biogas yield (m³ per kg manure)',
      'calc.adv.y.small': 'Rule of thumb: 0.04',
      'calc.adv.k.lbl':   'Electricity (kWh per m³ biogas)',
      'calc.adv.k.small': 'Engine + conversion efficiency',
      'calc.adv.f.lbl':   'Liquid fertilizer (L per kg manure)',
      'calc.adv.f.small': 'Rough average; varies by solids.',
      'calc.note':        '*Quick estimate using typical assumptions. Real output depends on diet, temperature, retention time, and engine efficiency.',

      /* CARBON */
      'carbon.badge':  'Future Plan',
      'carbon.h2':     'Show Your Sustainability Commitment',
      'carbon.sub':    'Offset your carbon footprint with verified carbon credits. Every tonne you offset supports clean energy projects and helps fight climate change.',
      'carbon.car':    'Offset your Car rides',
      'carbon.flight': 'Offset your Flights',
      'carbon.elec':   'Offset your Electricity',
      'carbon.buy':    'Buy now',
      'carbon.info':   '<i class="fa-solid fa-info-circle"></i> <strong>How it works:</strong> Purchase verified carbon credits to offset your emissions. Each credit represents one tonne of CO₂ reduced or removed from the atmosphere through our biogas projects.',

      /* ACHIEVEMENTS */
      'ach.h2':      'Our Wins &amp; Awards',
      'ach.sub':     'Click any award to see the story.',
      'ach.seemore': 'See more awards',

      /* BLOG */
      'blog.h2':     'Blog',
      'blog.sub':    'Articles, updates, pilots, and behind-the-scenes engineering.',
      'blog.seemore':'See more articles',

      /* TEAM */
      'team.founders': 'Founders',
      'team.core':     'Core Team',
      'team.advisors': 'Advisors',
      'team.p1.name': 'Nikoloz Gongliashvili',
      'team.p1.role': 'CEO',
      'team.p2.name': 'Nikoloz Chikhladze',
      'team.p2.role': 'CTO',
      'team.p3.name': 'Mariam Beltadze',
      'team.p3.role': 'CFO',
      'team.p4.name': 'Abdul Rehman',
      'team.p4.role': 'CPO',
      'team.p5.name': 'Nino Nikoladze',
      'team.p5.role': 'COO',
      'team.p6.name': 'Irakli Svanidze',
      'team.p6.role': 'Startup Mentor | Head of Innovation | Caucasus University',
      'team.p7.name': 'Cecily Kovatch',
      'team.p7.role': 'NJEDA Managing Director | Harvard Business School MBA',
      'team.p8.name': 'Thomas Wittig',
      'team.p8.role': 'CEO @ WITTIGONIA | Digital Growth, Data Insights, Strategy & Optimization',

      /* PARTNERS */
      'partners.badge':     'Trusted by leaders',
      'partners.h2':        'Our <span class="partners-title-accent">Partners</span>',
      'partners.sub':       "Organizations supporting BioNova's mission.",
      'partners.orgs':      'partner orgs',
      'partners.countries': 'countries',
      'partners.grants':    'in grants secured',

      /* CONTACT */
      'contact.h2': 'Get More Out of Your Manure',
      'contact.p':  "We'll help you turn organic waste into energy and new revenue.",

      /* FOOTER */
      'footer': '© 2026 BioNova. All Rights Reserved.',

      /* SDG tooltips */
      'sdg.0': 'SDG 7: Affordable & Clean Energy',
      'sdg.1': 'SDG 9: Industry, Innovation & Infrastructure',
      'sdg.2': 'SDG 11: Sustainable Cities & Communities',
      'sdg.3': 'SDG 12: Responsible Consumption & Production',
      'sdg.4': 'SDG 17: Partnerships for the Goals',
      'sdg.5': 'SDG 13: Climate Action',
      'sdg.6': 'SDG 14: Life Below Water',
    },

    ka: {
      /* NAV */
      'nav.about':    'რას ვაკეთებთ',
      'nav.why':      'რატომ BioNova',
      'nav.how':      'როგორ მუშაობს',
      'nav.pricing':  'ფასები',
      'nav.savings':  'დანაზოგი',
      'nav.wins':     'ჩვენი მიღწევები',
      'nav.blog':     'ბლოგი',
      'nav.team':     'გუნდი',
      'nav.partners': 'პარტნიორები',
      'nav.contact':  'კონტაქტი',

      /* HERO */
      'hero.title': 'მოგესალმებით BioNova-ში',
      'hero.cta1':  'რით ვართ განსხვავებულები',
      'hero.cta2':  'ფასების ნახვა',

      /* ABOUT */
      'about.eyebrow': 'ჩვენი მისია',
      'about.h2':  'რას ვაკეთებთ',
      'about.p':   'BioNova ქმნის მოდულურ, ჭკვიან და ფერმებზე მორგებულ ბიოდიჯესტერებს, რომლებიც ნაკელსა და საკვებ ნარჩენებს ბიოგაზად, ელექტროენერგიად და მაღალეფექტურ ბიოსასუქად გარდაქმნის. ჩვენი კომპაქტური სისტემები დამზადებულია გამძლე მასალებისგან და აღჭურვილია IoT აპლიკაციით, რათა ფერმერებმა ნებისმიერი ადგილიდან შეძლონ წარმოების, დანაზოგისა და სისტემის გამართულობის მონიტორინგი.',
      'about.tagline': 'მოკლედ: <strong>სუფთა ენერგია + ახალი შემოსავალი + დისტანციური კონტროლი</strong>. სპეციალურად ფერმებისთვის.',
      'about.chip.renewable': 'განახლებადი ენერგია',
      'about.chip.farm':      'ფერმებზე მორგებული',
      'about.chip.app':       'მოყვება აპლიკაცია',
      'about.chip.iot':       'IoT მონიტორინგი',
      'about.stat.affordable': 'კონკურენტებზე<br>ხელმისაწვდომი',
      'about.stat.revenue':    'შემოსავლის<br>წყაროები',
      'about.stat.monitoring': 'დისტანციური<br>მონიტორინგი',
      'about.pill.gas':  'ბიოგაზი',
      'about.pill.elec': 'ელექტროენერგია',
      'about.pill.fert': 'ბიოსასუქი',
      'about.iot':       'მიმდინარეობს ლაივ მონიტორინგი',

      /* WHY */
      'why.h2':    'რით განსხვავდება BioNova',
      'why.c1.h3': 'ფერმერებისთვის შექმნილი',
      'why.c1.p':  'კომპაქტური ზომა, ნაკელზე გათვლილი დიზაინი და მარტივად მისადგომი სერვის წერტილები. იდეალურად მუშაობს მცირე და საშუალო ფერმებში, რთული სამშენებლო სამუშაოების გარეშე.',
      'why.c2.h3': '<span class="highlight">3-ჯერ უფრო</span> იაფი',
      'why.c2.p':  'საწყისი ხარჯების (CAPEX) შესამცირებლად ვიყენებთ ეკონომიურ, კოროზიის მიმართ მდგრად მასალებს და ოპტიმიზებულ წარმოებას, ხარისხისა და გამძლეობის დათმობის გარეშე.',
      'why.c3.h3': 'აწყობა LEGO-ს პრინციპით',
      'why.c3.p':  'მოგეწოდებათ წინასწარ დამზადებული მოდულების სახით, სწრაფი შეერთების მილებითა და ფერებით კოდირებული პორტებით. ინსტალაციას კვირების ნაცვლად, მხოლოდ რამდენიმე დღე სჭირდება.',
      'why.c4.h3': 'სრული კონტროლი აპლიკაციით',
      'why.c4.p':  'აკონტროლეთ ბიოგაზის, ელექტროენერგიისა და სასუქის წარმოება, თვალი ადევნეთ დანაზოგებს, დაგეგმეთ ტექნიკური მომსახურება და მიიღეთ შეტყობინებები, ნებისმიერი მოწყობილობიდან, ნებისმიერ დროს.',
      'why.proof1': 'დაბალი საწყისი ხარჯი',
      'why.proof2': 'სწრაფი გაშვება',
      'why.proof3': 'მონაცემებზე დაფუძნებული ROI',
      'why.proof4': 'მარტივი ტექმომსახურება',

      /* APP */
      'app.h2': 'BioNova-ს აპლიკაცია',
      'app.p':  'BioNova-ს ყველა დანადგარს მოყვება ჩვენი მონიტორინგისა და ანალიტიკის აპლიკაცია. ფერმერებს შეუძლიათ რეალურ დროში აკონტროლონ წარმოების, დანაზოგებისა და სისტემის გამართულობის მაჩვენებლები, ასევე გაუზიარონ ანგარიშები კოოპერატივებს, ბანკებსა და პარტნიორებს.',
      'app.li1': 'ბიოგაზის, ელექტროენერგიისა და სასუქის მართვის პანელი',
      'app.li2': 'ჭკვიანი შეტყობინებები pH-ის, ტემპერატურისა და კვების რეჟიმის შესახებ',
      'app.li3': 'დანაზოგებისა & შემოსავლის მონიტორინგი',
      'app.li4': 'უსაფრთხო ღრუბლოვანი წვდომა ნებისმიერი მოწყობილობიდან',
      'app.kpi.gas':  'მ³ ბიოგაზი / დღეში',
      'app.kpi.elec': 'კვტ·სთ ელექტროენერგია / დღეში',
      'app.kpi.fert': 'ლიტრი სასუქი / დღეში',
      'app.cta':      'გამოთვალეთ თქვენი დანაზოგი',

      /* SETUP */
      'setup.h2':   'ინსტალაცია 4 ნაბიჯში',
      'setup.1.h4': '1. მიწოდება',
      'setup.1.p':  'წინასწარ აწყობილი მოდულები მოგეწოდებათ ადგილზე.',
      'setup.2.h4': '2. შეერთება',
      'setup.2.p':  'სწრაფი შეერთების მილები და ფერებით კოდირებული პორტები მარტივი მონტაჟისთვის.',
      'setup.3.h4': '3. გაშვება',
      'setup.3.p':  'სისტემის მარტივი გაშვება აპლიკაციის დახმარებით.',
      'setup.4.h4': '4. მონიტორინგი',
      'setup.4.p':  'წარმოების, დანაზოგებისა და ტექნიკური მომსახურების უწყვეტი მონიტორინგი.',

      /* HOW IT WORKS */
      'hiw.badge':   'პროცესი',
      'hiw.h2':      'როგორ მუშაობს?',
      'hiw.sub':     'ფერმის ნარჩენებიდან სუფთა ენერგიამდე 3 მარტივ ეტაპად.',
      'hiw.s1.h3':   'ორგანული ნარჩენების შეყვანა',
      'hiw.s1.p':    'თქვენს ფერმაში არსებული პირუტყვის ნაკელი და საკვები ნარჩენები გროვდება ყოველდღიურად',
      'hiw.s1.stat': '20–30 კგ/ცხოველი/დღე',
      'hiw.arrow1':  'მიეწოდება',
      'hiw.s2.h3':   'BioNova-ს ბიოდიჯესტერი',
      'hiw.s2.p':    'სისტემა პირდაპირ თქვენს ფერმაში ახდენს ნარჩენების ანაერობულ გადამუშავებას ენერგიად. 24/7 მონიტორინგი აპლიკაციის მეშვეობით.',
      'hiw.s2.stat1':'30 ტონა სიმძლავრე',
      'hiw.s2.stat2':'IoT მონიტორინგი',
      'hiw.arrow2':  'გამოიმუშავებს',
      'hiw.out.elec':'ბიოგაზი & ელექტროენერგია',
      'hiw.out.fert':'ბიოსასუქი',
      'hiw.out.h3':  '3 შემოსავლის წყარო',
      'hiw.out.p':   'თითოეული დანადგარი ერთდროულად გამოიმუშავებს სუფთა ენერგიას <em>და</em> მაღალხარისხიან თხევად სასუქს',

      /* PRICING */
      'price.h2':         'ფასები',
      'price.sub':        'აირჩიეთ მოდელი, რომელიც საუკეთესოდ ერგება თქვენს ბიუჯეტს.',
      'price.c1.h3':      'სრული შეძენა',
      'price.c1.p':       'გადაიხდით სრულ ფასს. დაიტოვებთ ელექტროენერგიისა და სასუქისგან მიღებული შემოსავლის 100%-ს.',
      'price.popular':    'ყველაზე პოპულარული',
      'price.soon':       'მალე',
      'price.indev':      'შექმნის პროცესშია',
      'price.est':        'სავარაუდო',
      'price.li.output':  'მაღალი წარმადობა',
      'price.li.app':     'დისტანციური მონიტორინგის აპლიკაცია',
      'price.li.own':     'სრული საკუთრება',
      'price.li.maxout':  'მაქსიმალური წარმადობა მსხვილი ფერმებისთვის',
      'price.li.proto':   'მიმდინარეობს აქტიური პროტოტიპირება',
      'price.li.same':    'იგივე აპარატურა და აპლიკაცია',
      'price.li.elec15':  'ელექტროენერგიის შემოსავლის 100%-ს ინარჩუნებთ',
      'price.li.fert45':  'ვაგროვებთ და ვყიდით თქვენს ბიო-სასუქს',
      'price.li.fertearn': 'იღებთ სასუქის გაყიდვებიდან შემოსავალს',
      'price.btn.choose': 'გეგმის არჩევა',
      'price.btn.notify': 'შემატყობინეთ',
      'price.btn.partner':'გახდი პარტნიორი',
      'price.c2.h3':      'პარტნიორობა BioNova-სთან',
      'price.c2.p':       'მიიღეთ ბიოდიჯესტერი <strong>ნახევარ ფასად</strong>. BioNova თავად უზრუნველყოფს თქვენი ბიოსასუქის მართვას — ჩვენ ვაგროვებთ, ვყიდით და ვუვლით ყველაფერს. თქვენ ყოველგვარი ჩართულობის გარეშე იღებთ შემოსავლის წილს.',
      'price.fine':       '*BioNova აგროვებს, გადაამუშავებს და ყიდს თქვენს ბიოსასუქს. წმინდა შემოსავლის ნაწილი გადმოგეცემათ თქვენ. ფერმერს შეუძლია გარკვეული რაოდენობა საკუთარი მოხმარებისთვის შეინარჩუნოს. ელექტროენერგიიდან მიღებული შემოსავლის 100% თქვენია. ზუსტი პირობები განისაზღვრება ხელშეკრულებით.',
      'price.roadmap':    'ჩვენ ვიზრდებით. 50-ტონიანი ბიოდიჯესტერი ამჟამად აქტიური პროტოტიპირების ფაზაშია, <a href="#contact">დაგვიკავშირდით</a> სიახლეებისთვის ან ინდივიდუალური, მსხვილი პროექტების განსახილველად.',

      /* CALCULATOR */
      'calc.h2':          'გამოთვალეთ თქვენი დანაზოგი',
      'calc.desc':        'აირჩიეთ პირუტყვის რაოდენობა და ელექტროენერგიის ტარიფი. დანარჩენზე ჩვენ ვიზრუნებთ. (<a href="#" id="toggleAdvancedLink">დეტალური პარამეტრები</a> ინჟინრებისთვის.)',
      'calc.lbl.animal':  'ცხოველი',
      'calc.btn.cows':    'ძროხა',
      'calc.btn.buffalo': 'კამეჩი',
      'calc.btn.pigs':    'ღორი',
      'calc.btn.mixed':   'შერეული',
      'calc.hint.animal': 'ვიყენებთ ერთ ცხოველზე ნარჩენებისა და გაზის გამოყოფის საშუალო მაჩვენებლებს.',
      'calc.lbl.herd':    'საქონლის რაოდენობა',
      'calc.unit.animals':'ცხოველი',
      'calc.hint.herd':   'მოარგეთ სლაიდერი თქვენს ფერმას.',
      'calc.lbl.tariff':  'ელექტროენერგიის ტარიფი',
      'calc.unit.kwh':    '1 კვტ·სთ-ზე',
      'calc.hint.tariff': 'მიუთითეთ თქვენი ქსელის ტარიფი.',
      'calc.lbl.model':   'მოდელი',
      'calc.btn.buy':     'სრული შეძენა',
      'calc.btn.partner': 'პარტნიორობა',
      'calc.hint.model':  'პარტნიორობა = ფასის 50% წინასწარ. BioNova მართავს და ყიდის თქვენს ბიო-სასუქს.',
      'calc.res.biogas':  'ბიოგაზი (დღეში)',
      'calc.res.elec':    'ელექტროენერგია (დღეში)',
      'calc.res.save':    'დანაზოგი (დღეში)',
      'calc.res.reco':    'რეკომენდებული ბიოდიჯესტერი',
      'calc.reco.hint':   'გამოითვლება საქონლის რაოდენობის მიხედვით.',
      'calc.res.capex':   'საწყისი ღირებულება',
      'calc.capex.hint':  'პარტნიორობის მოდელის შემთხვევაში იხდით 50%-ს.',
      'calc.res.payback': 'ინვესტიციის ამოღების ვადა',
      'calc.payback.hint':'მხოლოდ ენერგიის დაზოგვის ხარჯზე.',
      'calc.adv.summary': 'დეტალური პარამეტრები',
      'calc.adv.m.lbl':   'ნაკელი ცხოველზე (კგ/დღეში)',
      'calc.adv.m.small': 'საშ. ძროხა: 20–30',
      'calc.adv.y.lbl':   'ბიოგაზის გამოსავლიანობა (მ³/კგ ნაკელი)',
      'calc.adv.y.small': 'სტანდარტული მაჩვენებელი: 0.04',
      'calc.adv.k.lbl':   'ელექტროენერგია (კვტ·სთ / 1 მ³ ბიოგაზიდან)',
      'calc.adv.k.small': 'ძრავისა და გენერატორის ეფექტურობა',
      'calc.adv.f.lbl':   'თხევადი სასუქი (ლიტრი / კგ ნაკელზე)',
      'calc.adv.f.small': 'საშუალო მაჩვენებელი, დამოკიდებულია მყარ ნაწილაკებზე.',
      'calc.note':        '*ეს არის სწრაფი შეფასება საშუალო მაჩვენებლებზე დაყრდნობით. რეალური შედეგი დამოკიდებულია პირუტყვის კვებაზე, ტემპერატურაზე, გადამუშავების დროსა და ძრავის ეფექტურობაზე.',

      /* CARBON */
      'carbon.badge':  'მომავლის გეგმა',
      'carbon.h2':     'აჩვენეთ თქვენი ზრუნვა გარემოზე',
      'carbon.sub':    'დააკომპენსირეთ თქვენი ნახშირბადის კვალი სერტიფიცირებული ნახშირბადის კრედიტებით. ყოველი დაფინანსებული ტონა ხელს უწყობს სუფთა ენერგიის პროექტებს და კლიმატის ცვლილებებთან ბრძოლას.',
      'carbon.car':    'დააკომპენსირე ავტომობილის გამონაბოლქვი',
      'carbon.flight': 'დააკომპენსირე ფრენების გამონაბოლქვი',
      'carbon.elec':   'დააკომპენსირე ელექტროენერგიის მოხმარება',
      'carbon.buy':    'შეიძინე ახლავე',
      'carbon.info':   '<i class="fa-solid fa-info-circle"></i> <strong>როგორ მუშაობს:</strong> შეიძინეთ სერტიფიცირებული ნახშირბადის კრედიტები ემისიების დასაკომპენსირებლად. თითოეული კრედიტი უდრის ჩვენი ბიოგაზის პროექტების მეშვეობით ატმოსფეროში 1 ტონით შემცირებულ CO₂-ს.',

      /* ACHIEVEMENTS */
      'ach.h2':      'ჩვენი მიღწევები &amp; ჯილდოები',
      'ach.sub':     'დააჭირეთ ნებისმიერ ჯილდოს ისტორიის სანახავად.',
      'ach.seemore': 'მეტი ჯილდოს ნახვა',

      /* BLOG */
      'blog.h2':     'ბლოგი',
      'blog.sub':    'სტატიები, სიახლეები, საპილოტე პროექტები და ინჟინერია კულისებს მიღმა.',
      'blog.seemore':'მეტი სტატიის ნახვა',

      /* TEAM */
      'team.founders': 'დამფუძნებლები',
      'team.core':     'ძირითადი გუნდი',
      'team.advisors': 'მრჩევლები',
      'team.p1.name': 'ნიკოლოზ გონგლიაშვილი',
      'team.p1.role': 'CEO',
      'team.p2.name': 'ნიკოლოზ ჩიხლაძე',
      'team.p2.role': 'CTO',
      'team.p3.name': 'მარიამ ბელთაძე',
      'team.p3.role': 'CFO',
      'team.p4.name': 'აბდულ რეჰმანი',
      'team.p4.role': 'CPO',
      'team.p5.name': 'ნინო ნიკოლაძე',
      'team.p5.role': 'COO',
      'team.p6.name': 'ირაკლი სვანიძე',
      'team.p6.role': 'სტარტაპ მენტორი | ინოვაციების ხელმძღვანელი | კავკასიის უნივერსიტეტი',
      'team.p7.name': 'სესილი კოვაჩი',
      'team.p7.role': 'NJEDA-ს მართველი დირექტორი | ჰარვარდის სკოლის MBA',
      'team.p8.name': 'ტომას ვიტიგი',
      'team.p8.role': 'CEO @ WITTIGONIA | ციფრული ზრდა, მონაცემთა ანალიზი, სტრატეგია და ოპტიმიზაცია',

      /* PARTNERS */
      'partners.badge':     'გვანდობენ ლიდერები',
      'partners.h2':        'ჩვენი <span class="partners-title-accent">პარტნიორები</span>',
      'partners.sub':       'ორგანიზაციები, რომლებიც იზიარებენ და მხარს უჭერენ BioNova-ს მისიას.',
      'partners.orgs':      'პარტნიორი ორგანიზაცია',
      'partners.countries': 'ქვეყანა',
      'partners.grants':    'მოპოვებული გრანტები',

      /* CONTACT */
      'contact.h2': 'მიიღეთ მეტი სარგებელი ნარჩენებისგან',
      'contact.p':  'ჩვენ დაგეხმარებით ორგანული ნარჩენების სუფთა ენერგიად და ახალ შემოსავლად გარდაქმნაში.',

      /* FOOTER */
      'footer': '© 2026 BioNova. ყველა უფლება დაცულია.',

      /* SDG tooltips */
      'sdg.0': 'SDG 7: ხელმისაწვდომი და სუფთა ენერგია',
      'sdg.1': 'SDG 9: ინდუსტრია, ინოვაცია და ინფრასტრუქტურა',
      'sdg.2': 'SDG 11: მდგრადი ქალაქები და თემები',
      'sdg.3': 'SDG 12: პასუხისმგებლიანი მოხმარება და წარმოება',
      'sdg.4': 'SDG 17: პარტნიორობა მიზნებისთვის',
      'sdg.5': 'SDG 13: კლიმატის ცვლილების წინააღმდეგ მიმართული ქმედებები',
      'sdg.6': 'SDG 14: სიცოცხლე წყლის ქვეშ',
    },
  };

  /* ─────────────────────────────────────────────────────────────
     APPLY LANGUAGE
  ───────────────────────────────────────────────────────────── */
  function applyLang(lang) {
    const dict = T[lang] || T.en;

    /* textContent elements */
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = dict[el.dataset.i18n];
      if (v !== undefined) el.textContent = v;
    });

    /* innerHTML elements (contain tags like <strong>, <em>, <a>) */
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const v = dict[el.dataset.i18nHtml];
      if (v !== undefined) el.innerHTML = v;
    });

    /* SDG tooltip data-sdg attrs */
    document.querySelectorAll('.sdg-node').forEach((node, i) => {
      const v = dict[`sdg.${i}`];
      if (v) node.dataset.sdg = v;
    });

    /* lang button active state */
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('lang-active', btn.dataset.lang === lang);
    });

    document.documentElement.lang = lang;
    localStorage.setItem('bionova-lang', lang);

    /* notify other modules (typewriter, etc.) */
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  /* ─────────────────────────────────────────────────────────────
     BOOT
  ───────────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });
    const saved = localStorage.getItem('bionova-lang') || 'en';
    applyLang(saved);
  });

  window.bionovaI18n = { applyLang, T };
})();