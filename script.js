// 1. Dictionnaire de traduction (Français, Arabe, Tamazight)
const translations = {
    fr: {
        dir: 'ltr',
        slogan: "L'espace d'émergence de tout ce qui est ESS (Économie Sociale et Solidaire)",
        back: "Retour",
        menuDash: "Tableau de bord",
        menuCoop: "Coopératives",
        menuProj: "Projets ESS",
        menuClub: "AMDA Club",
        
        // Écran Tableau de bord
        dashTitle: "Espace d'Émergence & Performance",
        dashIntro: "Suivi des indicateurs clés de l'économie sociale et solidaire.",
        dashCardTitle: "Vue d'ensemble de l'impact",
        dashCardP: "Cet espace centralise l'évolution des projets incubés, le volume d'activité des coopératives partenaires et les métriques d'impact social sur les territoires.",
        thInd: "Indicateur", thReg: "Région", thVal: "Valeur Actuelle",
        ind1: "Projets incubés", reg1: "National", val1: "42 Structures",
        ind2: "Emplois solidaires créés", reg2: "Souss-Massa", val2: "185 Postes",
        
        // Écran Coopératives
        coopTitle: "Registre des Coopératives",
        coopIntro: "Traçabilité complète et transparence du producteur au consommateur.",
        coopCardTitle: "Nos Producteurs Engagés",
        thName: "Nom", thSpec: "Spécialité", thLoc: "Localisation",
        coop1Name: "Coopérative Aloa Biben", coop1Spec: "Huile d'Argan Premium", coop1Loc: "Essaouira",
        coop2Name: "Coopérative BioAtlas", coop2Spec: "Mélasse de Caroube", coop2Loc: "Midelt",
        
        // Écran Projets ESS
        projTitle: "Laboratoire d'Émergence Sociale",
        projIntro: "Accompagnement, incubation et recherche-action en économie solidaire.",
        projCardTitle: "Programmes d'incubation actuels",
        projCardP: "Déploiement de cadres collaboratifs pour renforcer l'intelligence collective et la gouvernance démocratique des structures rurales.",
        
        // Écran Club AMDA
        clubTitle: "L'Écosystème des Membres Engagés",
        clubIntro: "L'abonnement solidaire pour maximiser l'autonomie financière des producteurs.",
        clubCardTitle: "Avantages du Club AMDA",
        clubCardP: "En éliminant les intermédiaires spéculatifs, l'adhésion garantit un prix juste directement reversé aux coopératives et donne accès à un rapport d'impact trimestriel transparent."
    },
    ar: {
        dir: 'rtl',
        slogan: "فضاء بروز كل ما يتعلق بالاقتصاد الاجتماعي والتضامني (ESS)",
        back: "رجوع",
        menuDash: "لوحة القيادة",
        menuCoop: "التعاونيات",
        menuProj: "مشاريع ESS",
        menuClub: "نادي أمدا",
        
        // Écran Tableau de bord
        dashTitle: "فضاء البروز والأداء",
        dashIntro: "متابعة المؤشرات الرئيسية للاقتصاد الاجتماعي والتضامني.",
        dashCardTitle: "نظرة عامة على الأثر الاجتماعي",
        dashCardP: "يمركز هذا الفضاء تطور المشاريع المحتضنة، وحجم أنشطة التعاونيات الشريكة، ومقاييس الأثر الاجتماعي في المجالات الترابية.",
        thInd: "المؤشر", thReg: "الجهة", thVal: "القيمة الحالية",
        ind1: "المشاريع المحتضنة", reg1: "وطني", val1: "42 مؤسسة",
        ind2: "مناصب الشغل التضامنية", reg2: "سوس ماسة", val2: "185 منصب",
        
        // Écran Coopératives
        coopTitle: "سجل التعاونيات",
        coopIntro: "تتبع كامل وشفافية مطلقة من المنتج إلى المستهلك.",
        coopCardTitle: "منتجونا الملتزمون",
        thName: "الاسم", thSpec: "التخصص", thLoc: "الموقع",
        coop1Name: "تعاونية ألوى بيبان", coop1Spec: "زيت أركان ممتاز", coop1Loc: "الصويرة",
        coop2Name: "تعاونية بيو أطلس", coop2Spec: "دبس الخروب", coop2Loc: "ميدلت",
        
        // Écran Projets ESS
        projTitle: "مختبر البروز الاجتماعي",
        projIntro: "المواكبة، الاحتضان والبحث العملي في الاقتصاد التضامني.",
        projCardTitle: "برامج الاحتضان الحالية",
        projCardP: "نشر أطر عمل تعاونية لتعزيز الذكاء الجماعي والحكامة الديمقراطية للمؤسسات القروية.",
        
        // Écran Club AMDA
        clubTitle: "منظومة الأعضاء الملتزمين",
        clubIntro: "الاشتراك Tضامني لتعزيز الاستقلال المالي للمنتجين.",
        clubCardTitle: "مزايا نادي أمدا (AMDA Club)",
        clubCardP: "من خلال إلغاء الوسطاء، يضمن الاشتراك عائداً عادلاً يذهب مباشرة للتعاونيات مع إمكانية الوصول إلى تقرير أثر ربع سنوي شفاف."
    },
    zgh: {
        dir: 'ltr',
        slogan: "ⴰⴷⵖⴰⵔ ⵏ ⵓⵙuman ⵏ ⴽⵓⵍⵍⵓ ⵎⴰ ⵉⵣⴷⵉⵏ ⴷ ⵜⴷⴰⵎⵙⴰ ⵜⴰⵏⴰⵎⵓⵏⵜ ⵜⴰⵎⵢⴰⵡⴰⵙⵜ (ESS)",
        back: "ⴰⵖⵓⵍ",
        menuDash: "ⵜ
