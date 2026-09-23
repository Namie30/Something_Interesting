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
      'why.eyebrow': 'The Difference',
      'why.h2':    'Why BioNova Is Different',
      'why.c1.h3': 'Designed for Farmers',
      'why.c1.p':  'Compact footprint, manure-first design, and easy access to service points. Works on small and mid-size farms without civil-engineering headaches.',
      'why.c2.h3': 'Up to <span class="highlight">3× more affordable</span>',
      'why.c2.p':  'We use cost-efficient, corrosion-resistant materials and optimized fabrication to cut CAPEX, without compromising durability.',
      'why.c3.h3': 'LEGO-Style Setup',
      'why.c3.p':  'Ships as pre-fabricated modules with quick-connect piping and color-coded ports. Most installs are done in days, not weeks.',
      'why.c4.h3': 'Full App Control',
      'why.c4.p':  'Monitor gas, electricity, and fertilizer production, track savings, plan maintenance, and get alerts, from any device, anywhere.',
      'why.proof1': 'Lower up-front cost',
      'why.proof2': 'Faster commissioning',
      'why.proof3': 'Data-driven ROI',
      'why.proof4': 'Easy maintenance',

      /* APP */
      'app.eyebrow': 'Smart Monitoring',
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
      'setup.eyebrow': 'Installation',
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
      'hiw.s2.stat1': 'BN-108, 108 m³ capacity',
      'hiw.s2.stat2':'IoT monitored',
      'hiw.arrow2':  'produces',
      'hiw.out.elec':'Gas & Electricity',
      'hiw.out.fert':'Bio-Fertilizer',
      'hiw.out.h3':  '3 Revenue Streams',
      'hiw.out.p':   'Every unit generates clean energy <em>and</em> high-value liquid fertilizer simultaneously',

      /* PRICING */
      'price.eyebrow': 'Plans',
      'price.h2':         'Pricing',
      'price.sub':         'Hardware at production price. We earn when you earn, not before.',
      'price.banner.h3':   'Revenue-Sharing Model',
      'price.banner.p':    'We sell every digester <strong>at production price</strong>, no markup. Our income comes from collecting and selling your bio-fertilizer, then sharing the revenue with you. <strong>You keep 100% of your electricity revenue.</strong>',
      'price.tag':         'production price',
      'price.quote':      'Custom quote',
      'price.li.spec108': '108 m³ tank · 15 kW genset · 30 m³ gas holder',
      'price.li.cap108':  'Digests 1.42 t manure/day, about 70 cows',
      'price.li.spec200': '200 m³ tank, same architecture, scaled up',
      'price.li.cap200':  'Digests ~2.62 t manure/day, about 130 cows',
      'price.popular':    'Most popular',
      'price.soon':       'Coming Soon',
      'price.indev':      'In Development',
      'price.est':        'estimated',
      'price.li.proto':   'Actively prototyping now',
      'price.li.same':     'Full hardware & monitoring app',
      'price.li.elec15':  'Keep 100% of your electricity revenue',
      'price.li.fert45':  'We collect & sell your bio-fertilizer',
      'price.li.fertearn': 'Earn a share of fertilizer sales',
      'price.btn.notify': 'Notify me',
      'price.btn.partner':'Partner with us',
      'price.fine':        '*Revenue share applies to net revenue from fertilizer sales. You keep 100% of electricity revenue. Exact terms (tenor, metering, service) are finalized during contracting.',
      'price.roadmap': "We're scaling up. The BN-200 is currently in active prototyping, <a href=\"#contact\">get in touch</a> to stay updated or discuss larger custom installations. Bigger farms can also run several BN-108 units today.",

      /* CALCULATOR */
      'calc.eyebrow':     'ROI Estimator',
      'calc.h2':          'Estimate Your Returns',
      'calc.desc':        'Pick your herd size and tariff. We size the BN-108 units your farm needs and show what they earn. (<a href="#" id="toggleAdvancedLink">Advanced</a> for engineers.)',
      'calc.lbl.animal':  'Animal',
      'calc.btn.cows':    'Cows',
      'calc.btn.buffalo': 'Buffalo',
      'calc.btn.pigs':    'Pigs',
      'calc.btn.mixed':   'Mixed',
      'calc.hint.animal': 'We load typical collectable manure per animal.',
      'calc.lbl.herd':    'Herd size',
      'calc.unit.animals':'animals',
      'calc.hint.herd':   'Drag to match your farm.',
      'calc.lbl.tariff':  'Electricity price',
      'calc.unit.kwh':    'per kWh',
      'calc.hint.tariff': 'Use your grid tariff or PPA price.',

      'calc.scenario.lbl':  'Revenue case',
      'calc.scenario.cons': 'Conservative',
      'calc.scenario.up':   'Conservative + upside',
      'calc.scenario.hint': 'Conservative counts electricity and solid fertilizer only. Upside adds liquid digestate and carbon credits, both assume you sell everything you produce.',

      'calc.hero.income':      'Your estimated yearly net income',
      'calc.net.sub':          '{cur} {rev} revenue − {cur} {opex} running costs',
      'calc.hero.payback':     'Pays for itself in',
      'calc.hero.payback.sub': 'Net income vs. upfront price.',
      'calc.hero.lifetime':    '15-year net value',
      'calc.hero.lifetime.sub':'After paying back the units.',

      'calc.streams.title':'Revenue streams',
      'calc.donut.sub':    'from energy',
      'calc.stream.elec':  'Electricity',
      'calc.stream.solid': 'Solid fertilizer',
      'calc.stream.liquid':'Liquid digestate',
      'calc.stream.carbon':'Carbon credits',
      'calc.stream.base':  'counted in base case',
      'calc.stream.upside':'upside',

      'calc.res.biogas':  'Daily biogas',
      'calc.res.elec':    'Daily electricity (net)',
      'calc.res.solid':   'Daily solid fertilizer',
      'calc.res.liquid':  'Daily liquid digestate',
      'calc.res.opex':    'Running costs / yr',
      'calc.res.capex':   'Upfront (production price)',
      'calc.reco.hint':   'Sized from your herd.',
      'calc.reco.dyn':    'Digesting {proc} of {avail} t/day · {util}% utilisation',

      'calc.unit.mo':     'mo',
      'calc.unit.yrs':    'yrs',
      'calc.copy':        'Copy my estimate',
      'calc.copied':      'Copied!',
      'calc.cta':         'Talk to us',

      'calc.adv.summary':  'Advanced assumptions',
      'calc.adv.m.lbl':    'Manure per animal (kg/day)',
      'calc.adv.m.small':  'Collectable (barn-captured): ~15–25',
      'calc.adv.ts.lbl':   'Manure total solids TS (%)',
      'calc.adv.ts.small': 'Fresh cattle manure: ~20–28%',
      'calc.adv.vs.lbl':   'Volatile solids VS (% of TS)',
      'calc.adv.vs.small': 'The digestible fraction of the solids.',
      'calc.adv.cy.lbl':   'CH₄ yield (L per kg VS)',
      'calc.adv.cy.small': 'Mesophilic cattle manure: ~200–250',
      'calc.adv.cs.lbl':   'CH₄ share of biogas (%)',
      'calc.adv.cs.small': 'Rest is mostly CO₂. Sets biogas volume.',
      'calc.adv.ge.lbl':   'Genset efficiency (%)',
      'calc.adv.ge.small': '15 kW CHP unit, electrical only.',
      'calc.adv.pl.lbl':   'Parasitic load (%)',
      'calc.adv.pl.small': 'Pumps, mixing, heating, controls.',
      'calc.adv.hrt.lbl':  'Retention time HRT (days)',
      'calc.adv.hrt.small':'Lower HRT = more throughput, less gas.',
      'calc.adv.sp.lbl':   'Solid fertilizer price (per kg)',
      'calc.adv.sp.small': '0.89 GEL/kg in our model.',
      'calc.adv.lp.lbl':   'Liquid digestate price (per L)',
      'calc.adv.lp.small': '0.04 GEL/L. Upside case only.',
      'calc.adv.cp.lbl':   'Carbon credit price (per tonne CO₂e)',
      'calc.adv.cp.small': '≈ $10/t. Upside case only.',
      'calc.adv.od.lbl':   'Operating days per year',
      'calc.adv.od.small': '330 leaves room for service downtime.',

      'calc.dv.title':  'Derived from the values above',
      'calc.dv.work':   'Working volume',
      'calc.dv.slurry': 'Slurry fed',
      'calc.dv.cap':    'Capacity per unit',
      'calc.dv.water':  'Dilution water',
      'calc.dv.gas':    'Biogas per t manure',
      'calc.dv.kwh':    'Net power per t',
      'calc.dv.solid':  'Solid fert. per t',
      'calc.dv.liquid': 'Liquid per t',

      'calc.note':      '*Estimate from our techno-economic model for the BN-108 (108 m³ tank, 15 kW genset). Output is capped by what one unit can physically digest, extra herd adds units, not free gas. Real results depend on diet, temperature, retention time and engine condition.',

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
      'ach.eyebrow': 'Recognition',
      'ach.h2':      'Our Wins &amp; Awards',
      'ach.sub':     'Click any award to see the story.',
      'ach.seemore': 'See more awards',
      'ach.seeless':       'Show less',
      'ach.chip.all':      'All',
      'ach.chip.win':      'Wins',
      'ach.chip.grant':    'Grants',
      'ach.chip.accel':    'Programs',
      'ach.chip.global':   'Global',
      'ach.cat.win':       'Win',
      'ach.cat.grant':     'Grant',
      'ach.cat.accel':     'Program',
      'ach.cat.global':    'Global',
      'ach.stat.awards':   'Awards & recognitions',
      'ach.stat.countries':'Countries',
      'ach.stat.secured':  'Secured in grants',
      'ach.stat.beat':     'Startups outpaced',
      'ach.spot.tag':      'Biggest win yet · 2026',
      'ach.spot.h3':       'Blueing the Black Sea, Grand Prize Winner',
      'ach.spot.p':        'We went up against brilliant startups from 40 countries, through 3 selection stages, intensive bootcamps and elimination rounds, all the way to a "Shark Tank"-style live pitch finale in Chișinău, Moldova, where BioNova was announced the winner.',
      'ach.spot.s1':       '40 countries',
      'ach.spot.s2':       '3 selection stages',
      'ach.spot.s3':       'Live finale in Chișinău 🇲🇩',
      'ach.spot.backed':   'Backed by',

      /* BLOG */
      'blog.eyebrow': 'Insights',
      'team.eyebrow': 'The People',
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
      'team.p9.name': 'Tamta Mamulaidze',
      'team.p9.role': 'Head of Innovation & AgriTech | Georgian Farmers\' Association (GFA)',

      /* PARTNERS */
      'partners.badge':     'Trusted by leaders',
      'partners.eyebrow': 'Ecosystem',
      'partners.h2':        'Our <span class="partners-title-accent">Partners</span>',
      'partners.sub':       "Organizations supporting BioNova's mission.",
      'partners.orgs':      'partner orgs',
      'partners.countries': 'countries',
      'partners.grants':    'in grants secured',

      /* CONTACT */
      'contact.eyebrow': 'Get In Touch',
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
      'why.eyebrow': 'განსხვავება',
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
      'app.eyebrow': 'ჭკვიანი მონიტორინგი',
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
      'setup.eyebrow': 'ინსტალაცია',
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
      'hiw.s2.stat1': 'BN-108, 108 მ³ სიმძლავრე',
      'hiw.s2.stat2':'IoT მონიტორინგი',
      'hiw.arrow2':  'გამოიმუშავებს',
      'hiw.out.elec':'ბიოგაზი & ელექტროენერგია',
      'hiw.out.fert':'ბიოსასუქი',
      'hiw.out.h3':  '3 შემოსავლის წყარო',
      'hiw.out.p':   'თითოეული დანადგარი ერთდროულად გამოიმუშავებს სუფთა ენერგიას <em>და</em> მაღალხარისხიან თხევად სასუქს',

      /* PRICING */
      'price.eyebrow': 'პაკეტები',
      'price.h2':         'ფასები',
      'price.sub':         'ტექნიკა საწარმოო ფასად. ჩვენ შემოსავალს ვიღებთ მაშინ, როცა თქვენ, და არა მანამდე.',
      'price.banner.h3':   'შემოსავლის გაზიარების მოდელი',
      'price.banner.p':    'ჩვენ ვყიდით ყველა ბიოდიჯესტერს <strong>საწარმოო ფასად</strong>, დანამატის გარეშე. ჩვენი შემოსავალი მოდის თქვენი ბიო-სასუქის შეგროვებიდან და გაყიდვიდან, რომელსაც თქვენთან ვინაწილებთ. <strong>ელექტროენერგიის შემოსავლის 100% თქვენთან რჩება.</strong>',
      'price.tag':         'საწარმოო ფასი',
      'price.quote':      'ინდივიდუალური შეთავაზება',
      'price.li.spec108': '108 მ³ რეზერვუარი · 15 კვტ გენერატორი · 30 მ³ გაზჰოლდერი',
      'price.li.cap108':  'ამუშავებს 1.42 ტ ნაკელს დღეში, დაახლოებით 70 ძროხა',
      'price.li.spec200': '200 მ³ რეზერვუარი, იგივე არქიტექტურა, გაზრდილი',
      'price.li.cap200':  'ამუშავებს ~2.62 ტ ნაკელს დღეში, დაახლოებით 130 ძროხა',
      'price.popular':    'ყველაზე პოპულარული',
      'price.soon':       'მალე',
      'price.indev':      'შექმნის პროცესშია',
      'price.est':        'სავარაუდო',
      'price.li.proto':   'მიმდინარეობს აქტიური პროტოტიპირება',
      'price.li.same':     'სრული აპარატურა და მონიტორინგის აპლიკაცია',
      'price.li.elec15':  'ელექტროენერგიის შემოსავლის 100%-ს ინარჩუნებთ',
      'price.li.fert45':  'ვაგროვებთ და ვყიდით თქვენს ბიო-სასუქს',
      'price.li.fertearn': 'იღებთ სასუქის გაყიდვებიდან შემოსავალს',
      'price.btn.notify': 'შემატყობინეთ',
      'price.btn.partner':'გახდი პარტნიორი',
      'price.fine':        '*შემოსავლის გაზიარება ეხება სასუქის გაყიდვებიდან მიღებულ წმინდა შემოსავალს. ელექტროენერგიის შემოსავლის 100% თქვენთან რჩება. ზუსტი პირობები (ვადა, აღრიცხვა, სერვისი) განისაზღვრება ხელშეკრულებით.',
      'price.roadmap': 'ჩვენ ვიზრდებით. BN-200 ამჟამად აქტიური პროტოტიპირების ფაზაშია, <a href="#contact">დაგვიკავშირდით</a> სიახლეებისთვის ან ინდივიდუალური, მსხვილი პროექტების განსახილველად. მსხვილ ფერმებს დღესვე შეუძლიათ რამდენიმე BN-108 დანადგარის გამოყენება.',

      /* CALCULATOR */
      'calc.eyebrow':     'კალკულატორი',
      'calc.h2':          'გამოთვალეთ თქვენი შემოსავალი',
      'calc.desc':        'აირჩიეთ პირუტყვის რაოდენობა და ტარიფი. ჩვენ გამოვთვლით, რამდენი BN-108 დანადგარი გჭირდებათ და რა შემოსავალს მოგიტანთ. (<a href="#" id="toggleAdvancedLink">დეტალური პარამეტრები</a> ინჟინრებისთვის.)',
      'calc.lbl.animal':  'ცხოველი',
      'calc.btn.cows':    'ძროხა',
      'calc.btn.buffalo': 'კამეჩი',
      'calc.btn.pigs':    'ღორი',
      'calc.btn.mixed':   'შერეული',
      'calc.hint.animal': 'ვიყენებთ ერთ ცხოველზე შეგროვებადი ნაკელის საშუალო მაჩვენებელს.',
      'calc.lbl.herd':    'საქონლის რაოდენობა',
      'calc.unit.animals':'ცხოველი',
      'calc.hint.herd':   'მოარგეთ სლაიდერი თქვენს ფერმას.',
      'calc.lbl.tariff':  'ელექტროენერგიის ტარიფი',
      'calc.unit.kwh':    '1 კვტ·სთ-ზე',
      'calc.hint.tariff': 'მიუთითეთ თქვენი ქსელის ტარიფი.',

      'calc.scenario.lbl':  'შემოსავლის სცენარი',
      'calc.scenario.cons': 'კონსერვატიული',
      'calc.scenario.up':   'კონსერვატიული + დამატებითი',
      'calc.scenario.hint': 'კონსერვატიული ითვლის მხოლოდ ელექტროენერგიას და მყარ სასუქს. დამატებითი სცენარი ამატებს თხევად დიჯესტატს და ნახშირბადის კრედიტებს, ორივე გულისხმობს, რომ ყველაფერს ყიდით.',

      'calc.hero.income':      'თქვენი სავარაუდო წლიური წმინდა შემოსავალი',
      'calc.net.sub':          '{cur} {rev} შემოსავალი − {cur} {opex} საექსპლუატაციო ხარჯი',
      'calc.hero.payback':     'თვითანაზღაურდება',
      'calc.hero.payback.sub': 'წმინდა შემოსავალი საწყის ფასთან.',
      'calc.hero.lifetime':    '15-წლიანი წმინდა ღირებულება',
      'calc.hero.lifetime.sub':'დანადგარების ანაზღაურების შემდეგ.',

      'calc.streams.title':'შემოსავლის წყაროები',
      'calc.donut.sub':    'ენერგიიდან',
      'calc.stream.elec':  'ელექტროენერგია',
      'calc.stream.solid': 'მყარი სასუქი',
      'calc.stream.liquid':'თხევადი დიჯესტატი',
      'calc.stream.carbon':'ნახშირბადის კრედიტები',
      'calc.stream.base':  'ძირითად სცენარში',
      'calc.stream.upside':'დამატებითი',

      'calc.res.biogas':  'ბიოგაზი (დღეში)',
      'calc.res.elec':    'ელექტროენერგია, წმინდა (დღეში)',
      'calc.res.solid':   'მყარი სასუქი (დღეში)',
      'calc.res.liquid':  'თხევადი დიჯესტატი (დღეში)',
      'calc.res.opex':    'საექსპლუატაციო ხარჯი / წელი',
      'calc.res.capex':   'საწყისი ფასი (საწარმოო)',
      'calc.reco.hint':   'გამოითვლება საქონლის რაოდენობით.',
      'calc.reco.dyn':    'მუშავდება {proc} / {avail} ტ/დღეში · {util}% დატვირთვა',

      'calc.unit.mo':     'თვე',
      'calc.unit.yrs':    'წელი',
      'calc.copy':        'შეფასების კოპირება',
      'calc.copied':      'დაკოპირდა!',
      'calc.cta':         'დაგვიკავშირდით',

      'calc.adv.summary':  'დეტალური პარამეტრები',
      'calc.adv.m.lbl':    'ნაკელი ცხოველზე (კგ/დღეში)',
      'calc.adv.m.small':  'შეგროვებადი (სადგომში): ~15–25',
      'calc.adv.ts.lbl':   'მშრალი ნივთიერება TS (%)',
      'calc.adv.ts.small': 'ახალი პირუტყვის ნაკელი: ~20–28%',
      'calc.adv.vs.lbl':   'აქროლადი ნივთიერება VS (TS-ის %)',
      'calc.adv.vs.small': 'მშრალი ნივთიერების გადასამუშავებელი ნაწილი.',
      'calc.adv.cy.lbl':   'CH₄ გამოსავალი (ლ / კგ VS)',
      'calc.adv.cy.small': 'მეზოფილური რეჟიმი: ~200–250',
      'calc.adv.cs.lbl':   'CH₄ წილი ბიოგაზში (%)',
      'calc.adv.cs.small': 'დანარჩენი ძირითადად CO₂-ია. განსაზღვრავს ბიოგაზის მოცულობას.',
      'calc.adv.ge.lbl':   'გენერატორის ეფექტურობა (%)',
      'calc.adv.ge.small': '15 კვტ CHP დანადგარი, მხოლოდ ელექტრო.',
      'calc.adv.pl.lbl':   'საკუთარი მოხმარება (%)',
      'calc.adv.pl.small': 'ტუმბოები, შერევა, გათბობა, მართვა.',
      'calc.adv.hrt.lbl':  'გადამუშავების დრო HRT (დღე)',
      'calc.adv.hrt.small':'ნაკლები HRT = მეტი ნაკადი, ნაკლები გაზი.',
      'calc.adv.sp.lbl':   'მყარი სასუქის ფასი (კგ-ზე)',
      'calc.adv.sp.small': '0.89 ₾/კგ ჩვენს მოდელში.',
      'calc.adv.lp.lbl':   'თხევადი დიჯესტატის ფასი (ლიტრზე)',
      'calc.adv.lp.small': '0.04 ₾/ლ. მხოლოდ დამატებით სცენარში.',
      'calc.adv.cp.lbl':   'ნახშირბადის კრედიტის ფასი (ტონა CO₂e)',
      'calc.adv.cp.small': '≈ $10/ტ. მხოლოდ დამატებით სცენარში.',
      'calc.adv.od.lbl':   'სამუშაო დღე წელიწადში',
      'calc.adv.od.small': '330 დღე ტოვებს დროს მომსახურებისთვის.',

      'calc.dv.title':  'გამოთვლილია ზემოთ მითითებული მონაცემებიდან',
      'calc.dv.work':   'სამუშაო მოცულობა',
      'calc.dv.slurry': 'მიწოდებული ნაკადი',
      'calc.dv.cap':    'ერთი დანადგარის სიმძლავრე',
      'calc.dv.water':  'გასაზავებელი წყალი',
      'calc.dv.gas':    'ბიოგაზი 1 ტ ნაკელზე',
      'calc.dv.kwh':    'წმინდა ენერგია 1 ტონაზე',
      'calc.dv.solid':  'მყარი სასუქი 1 ტონაზე',
      'calc.dv.liquid': 'თხევადი 1 ტონაზე',

      'calc.note':      '*შეფასება BN-108-ის (108 მ³ რეზერვუარი, 15 კვტ გენერატორი) ტექნიკურ-ეკონომიკურ მოდელზე დაყრდნობით. გამომუშავება შეზღუდულია იმით, რის გადამუშავებასაც ერთი დანადგარი ახერხებს, მეტი პირუტყვი ნიშნავს მეტ დანადგარს და არა უფასო გაზს. რეალური შედეგი დამოკიდებულია კვებაზე, ტემპერატურაზე, გადამუშავების დროსა და ძრავის მდგომარეობაზე.',

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
      'ach.eyebrow': 'აღიარება',
      'ach.h2':      'ჩვენი მიღწევები &amp; ჯილდოები',
      'ach.sub':     'დააჭირეთ ნებისმიერ ჯილდოს ისტორიის სანახავად.',
      'ach.seemore': 'მეტი ჯილდოს ნახვა',
      'ach.seeless':       'ნაკლების ჩვენება',
      'ach.chip.all':      'ყველა',
      'ach.chip.win':      'გამარჯვებები',
      'ach.chip.grant':    'გრანტები',
      'ach.chip.accel':    'პროგრამები',
      'ach.chip.global':   'საერთაშორისო',
      'ach.cat.win':       'გამარჯვება',
      'ach.cat.grant':     'გრანტი',
      'ach.cat.accel':     'პროგრამა',
      'ach.cat.global':    'საერთაშორისო',
      'ach.stat.awards':   'ჯილდო და აღიარება',
      'ach.stat.countries':'ქვეყანა',
      'ach.stat.secured':  'მოზიდული დაფინანსება',
      'ach.stat.beat':     'დაჯაბნილი სტარტაპი',
      'ach.spot.tag':      'ყველაზე დიდი გამარჯვება · 2026',
      'ach.spot.h3':       'Blueing the Black Sea, მთავარი პრიზის მფლობელი',
      'ach.spot.p':        '40 ქვეყნის საუკეთესო სტარტაპებს ვეჯიბრებოდით, 3 შესარჩევი ეტაპის, ინტენსიური ბუთქემფებისა და გამოსაშვები რაუნდების გავლით, საბოლოოდ კი კიშინიოვში (მოლდოვა), გამართულ „Shark Tank"-ის სტილის ლაივ ფინალში BioNova გამარჯვებულად დასახელდა.',
      'ach.spot.s1':       '40 ქვეყანა',
      'ach.spot.s2':       '3 შესარჩევი ეტაპი',
      'ach.spot.s3':       'ლაივ ფინალი კიშინიოვში 🇲🇩',
      'ach.spot.backed':   'მხარდამჭერები',

      /* BLOG */
      'blog.eyebrow': 'სიახლეები',
      'team.eyebrow': 'ჩვენი ხალხი',
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
      'team.p9.name': 'თამთა მამულაიძე',
      'team.p9.role': 'ინოვაციებისა და აგროტექნოლოგიების ხელმძღვანელი | საქართველოს ფერმერთა ასოციაცია (GFA)',

      /* PARTNERS */
      'partners.badge':     'გვანდობენ ლიდერები',
      'partners.eyebrow': 'ეკოსისტემა',
      'partners.h2':        'ჩვენი <span class="partners-title-accent">პარტნიორები</span>',
      'partners.sub':       'ორგანიზაციები, რომლებიც იზიარებენ და მხარს უჭერენ BioNova-ს მისიას.',
      'partners.orgs':      'პარტნიორი ორგანიზაცია',
      'partners.countries': 'ქვეყანა',
      'partners.grants':    'მოპოვებული გრანტები',

      /* CONTACT */
      'contact.eyebrow': 'დაგვიკავშირდით',
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
