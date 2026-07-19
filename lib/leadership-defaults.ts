// Shared default leadership/team roster — single source of truth for the
// /team page, /admin/leadership editor, and the About page leadership
// section. All three read from the same DB setting ("site.leadership")
// once an admin saves changes; this is only the pre-save fallback, sourced
// from the real bios/socials already used on the /blog/[id] profile pages
// (see lib/team-data.ts).
export type LeadershipMember = {
  name: string;
  title: string;
  bio: string;
  photo: string;
  avatar: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  color: string;
};

export const DEFAULT_LEADERSHIP: LeadershipMember[] = [
  {
    name: "Shanjay Akash T",
    title: "Founder & Leading Director",
    bio: "Founder and Leading Director of Akronix, Shanjay leads the company with a strong vision for scalable digital ecosystems.",
    photo: "/shanjay pic.jpeg",
    avatar: "SA",
    linkedin: "https://www.linkedin.com/in/shanjay-akash-t-238464323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    twitter: "https://twitter.com/shanjay",
    instagram: "https://instagram.com/__mr.sanch__",
    color: "#5B4DFF",
  },
  {
    name: "Bharath",
    title: "Co-Founder & Executive Officer",
    bio: "Bharath plays a crucial role in business operations and strategic execution.",
    photo: "/bharath pic.jpeg",
    avatar: "B",
    linkedin: "",
    twitter: "https://twitter.com/bharath",
    instagram: "https://instagram.com/bharath",
    color: "#7DD3FC",
  },
  {
    name: "Listhiroger",
    title: "Co-Founder & Networking Head",
    bio: "Listhiroger leads networking and infrastructure at Akronix.",
    photo: "/listhi pic.jpeg",
    avatar: "L",
    linkedin: "",
    twitter: "https://twitter.com/listhiroger",
    instagram: "https://instagram.com/listhiroger",
    color: "#34D399",
  },
  {
    name: "Vishal",
    title: "Technical Officer",
    bio: "As Technical Officer, Vishal leads the engineering direction of Akronix, ensuring strong architecture and system reliability.",
    photo: "/vishal pic.JPG",
    avatar: "V",
    linkedin: "https://www.linkedin.com/in/vishal-maran-697103349/",
    twitter: "https://twitter.com/vishal",
    instagram: "https://instagram.com/vxshal_xo",
    color: "#F08A8A",
  },
  {
    name: "Pranav",
    title: "Creative Officer",
    bio: "Pranav leads the creative direction at Akronix, shaping brand identity and user experience.",
    photo: "/pranav pic.jpeg",
    avatar: "P",
    linkedin: "",
    twitter: "https://twitter.com/pranav",
    instagram: "https://instagram.com/__.pranzzz__",
    color: "#FBBF24",
  },
  {
    name: "Sarvika",
    title: "Digital Marketing Lead & Account Manager",
    bio: "Sarvika leads digital marketing and client relationships at Akronix.",
    photo: "/Sarvika pic.jpeg",
    avatar: "S",
    linkedin: "https://www.linkedin.com/in/sarvika-k-ab74b3326",
    twitter: "https://twitter.com/sarvika",
    instagram: "https://instagram.com/sarvika_166",
    color: "#F472B6",
  },
  {
    name: "Mareeswaran",
    title: "Editing & Designing Head",
    bio: "Mareeswaran heads editing and design, delivering high-quality visual content.",
    photo: "/Mareeswaran pic.jpeg",
    avatar: "M",
    linkedin: "",
    twitter: "https://twitter.com/mareeswaran",
    instagram: "https://instagram.com/mareeswaran",
    color: "#FB923C",
  },
  {
    name: "Avanthika Pradeep",
    title: "Technical Member",
    bio: "A key technical contributor at Akronix, Avanthika focuses on backend development and scalable architectures.",
    photo: "/avanthika pic.jpeg",
    avatar: "AP",
    linkedin: "https://www.linkedin.com/in/avanthika-pradeep-90252b310?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    twitter: "https://twitter.com/avanthika",
    instagram: "https://www.instagram.com/avanthio_o?utm_source=qr&igsh=NzNjMzQ2dzVsdTU1",
    color: "#60A5FA",
  },
  {
    name: "Dakshithaa",
    title: "Technical Member",
    bio: "Dakshithaa contributes to development and system improvements through continuous innovation.",
    photo: "/Dakshitha pic.jpg",
    avatar: "D",
    linkedin: "",
    twitter: "https://twitter.com/dakshithaa",
    instagram: "https://instagram.com/dakshithaa",
    color: "#A78BFA",
  },
  {
    name: "Suriyakrishna",
    title: "Designer",
    bio: "Suriyakrishna contributes to UI/UX design, creating clean and user-friendly interfaces.",
    photo: "/suriya krishna pic.jpeg",
    avatar: "SK",
    linkedin: "",
    twitter: "https://twitter.com/suriyakrishna",
    instagram: "https://instagram.com/suriyakrishna",
    color: "#818CF8",
  },
];
