import { Faculties } from "./types";

export const FacultyDisplayNames: Record<Faculties, string> = {
  [Faculties.INDUSTRIAL_AND_SYSTEMS_ENGINEERING]:
    "دانشکده مهندسی و مدیریت صنعتی",
  [Faculties.MECHANICAL_AEROSPACE_MARINE_ENGINEERING]:
    "دانشکده مهندسی مکانیک، هوافضا و دریایی",
  [Faculties.MATERIALS_AND_ADVANCED_PROCESSES]:
    "دانشکده مهندسی مواد و فرآیندهای پیشرفته",
  [Faculties.ELECTRICAL_COMPUTER_BIOMEDICAL_ENGINEERING]:
    "دانشکده مهندسی برق، کامپیوتر و پزشکی‌زیستی",
  [Faculties.PETROLEUM_CIVIL_MINING_ENGINEERING]:
    "دانشکده مهندسی نفت، عمران و معدن",
  [Faculties.SCIENCE]: "دانشکده علوم",
  [Faculties.MATH_LASER_OPTICS_RESEARCH]: "پژوهشکده ریاضیات، لیزر و اپتیک",
  [Faculties.FOREIGN_LANGUAGES]: "زبان‌های خارجی",
  [Faculties.PHYSICAL_EDUCATION]: "تربیت‌بدنی",
  [Faculties.INTERNATIONAL_LANGUAGE_CENTER]: "مرکز زبان بین‌الملل",
  [Faculties.ROBOTICS]: "رباتیک",
  [Faculties.MECHATRONICS]: "مکاترونیک",
  [Faculties.MATERIALS_AND_CORROSION]: "مواد و خوردگی",
  [Faculties.TEXTILE_ENGINEERING]: "مهندسی نساجی",
  [Faculties.POLYMER_ENGINEERING]: "مهندسی پلیمر",
  [Faculties.CHEMICAL_ENGINEERING]: "مهندسی شیمی",
  [Faculties.COMPUTER_ENGINEERING]: "مهندسی کامپیوتر",
  [Faculties.INDUSTRIAL_ENGINEERING_AND_MANAGEMENT_SYSTEMS]:
    "مهندسی صنایع و سیستم‌های مدیریت",
  [Faculties.CIVIL_AND_ENVIRONMENTAL_ENGINEERING]: "مهندسی عمران و محیط‌زیست",
  [Faculties.ELECTRICAL_ENGINEERING]: "مهندسی برق",
  [Faculties.PHYSICS_AND_ENERGY_ENGINEERING]: "فیزیک و مهندسی انرژی",
  [Faculties.MINING_AND_METALLURGY_ENGINEERING]: "مهندسی معدن و متالورژی",
  [Faculties.PETROLEUM_ENGINEERING]: "مهندسی نفت",

  [Faculties.AEROSPACE_ENGINEERING]: "مهندسی هوافضا",
  [Faculties.CHEMICAL_AND_PETROLEUM_ENGINEERING]: "مهندسی شیمی و نفت",
  [Faculties.CHEMISTRY]: "شیمی",
  [Faculties.CIVIL_ENGINEERING]: "مهندسی عمران",
  [Faculties.ENERGY_ENGINEERING]: "مهندسی انرژی",
  [Faculties.INDUSTRIAL_ENGINEERING]: "مهندسی صنایع",
  [Faculties.MATERIALS_SCIENCE_AND_ENGINEERING]: "علم و مهندسی مواد",
  [Faculties.MECHANICAL_ENGINEERING]: "مهندسی مکانیک",
  [Faculties.MATHEMATICAL_SCIENCES]: "علوم ریاضی",
  [Faculties.PHYSICS]: "فیزیک",
  [Faculties.MANAGEMENT_AND_ECONOMICS]: "مدیریت و اقتصاد",
  [Faculties.LANGUAGES_AND_LINGUISTICS]: "زبان‌ها و زبان‌شناسی",
  [Faculties.PHILOSOPHY_OF_SCIENCE]: "فلسفه علم",

  [Faculties.BUSINESS_AND_FINANCE]: "دانشکده بازرگانی و امور مالی",
  [Faculties.WORLD_STUDIES]: "دانشکده مطالعات جهان",
  [Faculties.VETERINARY_MEDICINE]: "دانشکده دامپزشکی",
  [Faculties.THEOLOGY_AND_ISLAMIC_STUDIES]: "دانشکده الهیات و معارف اسلامی",
  [Faculties.SOCIAL_SCIENCES]: "دانشکده علوم اجتماعی",
  [Faculties.PSYCHOLOGY_AND_EDUCATION_SCIENCES]:
    "دانشکده روان‌شناسی و علوم تربیتی",
  [Faculties.PHYSICAL_EDUCATION_AND_SPORT_SCIENCES]:
    "دانشکده تربیت‌بدنی و علوم ورزشی",
  [Faculties.MANAGEMENT]: "دانشکده مدیریت",
  [Faculties.LITERATURE_AND_HUMANITIES]: "دانشکده ادبیات و علوم انسانی",
  [Faculties.LAW_AND_POLITICAL_SCIENCE]: "دانشکده حقوق و علوم سیاسی",
  [Faculties.ISLAMIC_THOUGHT_AND_STUDIES]: "دانشکده اندیشه و معارف اسلامی",
  [Faculties.GEOGRAPHY]: "دانشکده جغرافیا",
  [Faculties.FOREIGN_LANGUAGES_AND_LITERATURE]:
    "دانشکده زبان‌ها و ادبیات خارجی",
  [Faculties.ENTREPRENEURSHIP]: "دانشکده کارآفرینی",
  [Faculties.ECONOMICS]: "دانشکده اقتصاد",
  [Faculties.SCIENCE_AND_NEW_TECHNOLOGIES]: "دانشکده علوم و فناوری‌های نو",
  [Faculties.ART]: "دانشکده هنر",
  [Faculties.AGRICULTURE_AND_NATURAL_RESOURCES]:
    "دانشکده کشاورزی و منابع طبیعی",
};

/**
 * University -> Faculties mapping using enum IDs.
 */
export const UniversityFaculties: Record<Universities, Faculties[]> = {
  [Universities.AMIRKABIR]: [
    Faculties.INDUSTRIAL_AND_SYSTEMS_ENGINEERING,
    Faculties.MECHANICAL_AEROSPACE_MARINE_ENGINEERING,
    Faculties.MATERIALS_AND_ADVANCED_PROCESSES,
    Faculties.ELECTRICAL_COMPUTER_BIOMEDICAL_ENGINEERING,
    Faculties.PETROLEUM_CIVIL_MINING_ENGINEERING,
    Faculties.SCIENCE,
    Faculties.MATH_LASER_OPTICS_RESEARCH,
    Faculties.FOREIGN_LANGUAGES,
    Faculties.PHYSICAL_EDUCATION,
    Faculties.INTERNATIONAL_LANGUAGE_CENTER,
    Faculties.ROBOTICS,
    Faculties.MECHATRONICS,
    Faculties.MATERIALS_AND_CORROSION,
    Faculties.TEXTILE_ENGINEERING,
    Faculties.POLYMER_ENGINEERING,
    Faculties.CHEMICAL_ENGINEERING,
    Faculties.COMPUTER_ENGINEERING,
    Faculties.INDUSTRIAL_ENGINEERING_AND_MANAGEMENT_SYSTEMS,
    Faculties.CIVIL_AND_ENVIRONMENTAL_ENGINEERING,
    Faculties.ELECTRICAL_ENGINEERING,
    Faculties.PHYSICS_AND_ENERGY_ENGINEERING,
    Faculties.MINING_AND_METALLURGY_ENGINEERING,
    Faculties.PETROLEUM_ENGINEERING,
  ],

  [Universities.SHARIF]: [
    Faculties.AEROSPACE_ENGINEERING,
    Faculties.CHEMICAL_AND_PETROLEUM_ENGINEERING,
    Faculties.CHEMISTRY,
    Faculties.CIVIL_ENGINEERING,
    Faculties.COMPUTER_ENGINEERING,
    Faculties.ELECTRICAL_ENGINEERING,
    Faculties.ENERGY_ENGINEERING,
    Faculties.INDUSTRIAL_ENGINEERING,
    Faculties.MATERIALS_SCIENCE_AND_ENGINEERING,
    Faculties.MECHANICAL_ENGINEERING,
    Faculties.MATHEMATICAL_SCIENCES,
    Faculties.PHYSICS,
    Faculties.MANAGEMENT_AND_ECONOMICS,
    Faculties.LANGUAGES_AND_LINGUISTICS,
    Faculties.PHILOSOPHY_OF_SCIENCE,
  ],

  [Universities.TEHRAN]: [
    Faculties.BUSINESS_AND_FINANCE,
    Faculties.WORLD_STUDIES,
    Faculties.VETERINARY_MEDICINE,
    Faculties.THEOLOGY_AND_ISLAMIC_STUDIES,
    Faculties.SOCIAL_SCIENCES,
    Faculties.PSYCHOLOGY_AND_EDUCATION_SCIENCES,
    Faculties.PHYSICAL_EDUCATION_AND_SPORT_SCIENCES,
    Faculties.MANAGEMENT,
    Faculties.LITERATURE_AND_HUMANITIES,
    Faculties.LAW_AND_POLITICAL_SCIENCE,
    Faculties.ISLAMIC_THOUGHT_AND_STUDIES,
    Faculties.GEOGRAPHY,
    Faculties.FOREIGN_LANGUAGES_AND_LITERATURE,
    Faculties.ENTREPRENEURSHIP,
    Faculties.ECONOMICS,
    Faculties.SCIENCE_AND_NEW_TECHNOLOGIES,
    Faculties.ART,
    Faculties.AGRICULTURE_AND_NATURAL_RESOURCES,
  ],

  [Universities.OTHER1]: [],
};
