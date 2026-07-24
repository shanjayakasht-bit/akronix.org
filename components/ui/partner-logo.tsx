function LogoSRM() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-blue-700 flex-shrink-0">
        <span className="text-[9px] font-black text-blue-700 leading-none">SRM</span>
      </div>
      <div className="leading-tight">
        <p className="text-[11px] font-black text-blue-800 tracking-tight">SRM</p>
        <p className="text-[8px] text-blue-600 font-semibold uppercase tracking-wider">University</p>
      </div>
    </div>
  );
}
function LogoVIT() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-sm flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg,#1e3a8a,#1d4ed8)" }}>
        <span className="text-[10px] font-black text-white">VIT</span>
      </div>
      <div className="leading-tight">
        <p className="text-[11px] font-black text-blue-900 tracking-tight">VIT</p>
        <p className="text-[8px] text-blue-500 font-semibold">University</p>
      </div>
    </div>
  );
}
function LogoGoogle() {
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M27.6 14.32c0-.96-.08-1.89-.24-2.77H14v5.24h7.62a6.5 6.5 0 01-2.83 4.27v3.55h4.58c2.68-2.47 4.23-6.1 4.23-10.29z" fill="#4285F4"/>
        <path d="M14 28c3.83 0 7.04-1.27 9.38-3.43l-4.58-3.55c-1.27.85-2.89 1.36-4.8 1.36-3.69 0-6.82-2.49-7.93-5.84H1.4v3.67A14 14 0 0014 28z" fill="#34A853"/>
        <path d="M6.07 16.54A8.4 8.4 0 015.64 14c0-.88.15-1.73.43-2.54V7.79H1.4A14 14 0 000 14c0 2.26.54 4.4 1.4 6.21l4.67-3.67z" fill="#FBBC05"/>
        <path d="M14 5.58c2.08 0 3.94.71 5.41 2.12l4.05-4.05C21.03 1.4 17.82 0 14 0A14 14 0 001.4 7.79l4.67 3.67C7.18 8.07 10.31 5.58 14 5.58z" fill="#EA4335"/>
      </svg>
      <div className="leading-tight">
        <p className="text-[11px] font-bold text-gray-800">Google</p>
        <p className="text-[8px] text-gray-500 font-medium">for Developers</p>
      </div>
    </div>
  );
}
function LogoAWS() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-shrink-0">
        <svg width="36" height="22" viewBox="0 0 54 32" fill="none">
          <path d="M15.3 11.6c0 .7.1 1.2.2 1.6.2.4.4.8.8 1.2.1.1.2.3.2.4 0 .2-.1.3-.4.5l-1.3.9c-.2.1-.3.2-.5.2-.2 0-.3-.1-.5-.2-.2-.2-.4-.5-.6-.7-.2-.3-.4-.6-.6-.9-1.5 1.8-3.4 2.7-5.7 2.7-1.6 0-2.9-.5-3.8-1.4-.9-.9-1.4-2.2-1.4-3.7 0-1.6.6-3 1.7-4 1.1-1 2.6-1.5 4.5-1.5.6 0 1.2.1 1.9.2.7.1 1.4.3 2.1.5V6c0-1.4-.3-2.4-.9-3-.6-.6-1.6-.9-3-.9-.6 0-1.3.1-2 .3-.7.2-1.3.4-2 .7-.3.1-.5.2-.6.2h-.2c-.2 0-.3-.2-.3-.5V1.9c0-.3 0-.4.1-.5.1-.1.3-.2.5-.3.7-.4 1.5-.6 2.5-.9C7 0 8.1 0 9.2 0c2.3 0 4 .5 5.1 1.6 1.1 1 1.6 2.6 1.6 4.7v6.3h-.6zm-7.9 3c.6 0 1.2-.1 1.9-.4.7-.3 1.3-.7 1.8-1.3.3-.4.5-.8.6-1.2.1-.4.2-1 .2-1.6v-.8c-.5-.1-1.1-.2-1.6-.3-.5-.1-1.1-.1-1.6-.1-1.1 0-2 .2-2.5.7-.6.5-.9 1.1-.9 2 0 .8.2 1.4.6 1.8.4.3 1 .5 1.5.5v-.3zM22.5 17c-.3 0-.5 0-.6-.1-.1-.1-.3-.3-.4-.6l-4.3-14.2c-.1-.3-.2-.5-.2-.7 0-.3.1-.4.4-.4h1.7c.3 0 .5 0 .6.1.1.1.3.3.4.6l3.1 12.1 2.8-12.1c.1-.3.2-.5.4-.6.1-.1.4-.1.6-.1h1.4c.3 0 .5 0 .7.1.1.1.3.3.3.6l2.9 12.2 3.1-12.2c.1-.3.2-.5.4-.6.1-.1.4-.1.6-.1h1.6c.3 0 .4.1.4.4 0 .1 0 .2-.1.4 0 .1-.1.2-.1.4L34.1 16.3c-.1.3-.2.5-.4.6-.1.1-.4.1-.6.1h-1.5c-.3 0-.5 0-.7-.1-.1-.1-.3-.3-.3-.6l-2.8-11.8L25.1 16.3c-.1.3-.2.5-.4.6-.1.1-.4.1-.6.1h-1.6zM40.7 17.3c-1 0-1.9-.1-2.8-.4-.9-.3-1.6-.6-2.1-1-.3-.2-.5-.4-.5-.6v-.9c0-.3.1-.5.4-.5.1 0 .2 0 .4.1l.5.3c.7.4 1.4.6 2.1.8.7.2 1.5.3 2.2.3 1.1 0 2-.2 2.6-.6.6-.4.9-1 .9-1.7 0-.5-.2-.9-.5-1.3-.3-.3-.9-.6-1.8-.9l-2.5-.8c-1.3-.4-2.2-1-2.8-1.8-.6-.8-.9-1.6-.9-2.6 0-.7.2-1.4.5-2 .3-.6.8-1.1 1.3-1.5.6-.4 1.2-.7 1.9-.9.7-.2 1.5-.3 2.3-.3.4 0 .8 0 1.2.1.4.1.8.1 1.1.2.4.1.7.2 1 .3.3.1.6.3.7.4.2.1.4.3.4.4.1.1.1.3.1.5v.9c0 .3-.1.5-.4.5-.2 0-.4-.1-.7-.2-.9-.4-1.9-.6-3-.6-1 0-1.8.2-2.4.5-.6.3-.8.8-.8 1.5 0 .5.2.9.5 1.2.3.3 1 .6 1.9.9l2.4.8c1.3.4 2.2 1 2.7 1.7.5.7.8 1.5.8 2.4 0 .7-.2 1.4-.5 2-.3.6-.8 1.1-1.4 1.6-.6.4-1.2.7-2 1-.8.2-1.7.3-2.6.3z" fill="#FF9900"/>
          <text x="0" y="28" fontSize="8" fill="#FF9900" fontWeight="bold" fontFamily="Arial">educate</text>
        </svg>
      </div>
    </div>
  );
}
function LogoMicrosoft() {
  return (
    <div className="flex items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 21 21" fill="none">
        <rect x="0"  y="0"  width="10" height="10" fill="#F25022"/>
        <rect x="11" y="0"  width="10" height="10" fill="#7FBA00"/>
        <rect x="0"  y="11" width="10" height="10" fill="#00A4EF"/>
        <rect x="11" y="11" width="10" height="10" fill="#FFB900"/>
      </svg>
      <div className="leading-tight">
        <p className="text-[11px] font-semibold text-gray-800">Microsoft</p>
        <p className="text-[9px] font-bold text-blue-600">Learn</p>
      </div>
    </div>
  );
}
function LogoNasscom() {
  return (
    <div className="leading-tight">
      <p className="text-[12px] font-black text-blue-800 tracking-tight">NASSCOM</p>
      <p className="text-[8px] font-bold text-blue-500 tracking-widest uppercase">Foundation</p>
    </div>
  );
}
function LogoICT() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg,#6d28d9,#4c1d95)" }}>
        <span className="text-[8px] font-black text-white leading-none">ICT</span>
      </div>
      <div className="leading-tight">
        <p className="text-[10px] font-black text-purple-800">ICT</p>
        <p className="text-[8px] font-bold text-purple-500 uppercase tracking-wide">Academy</p>
      </div>
    </div>
  );
}

const PRESET_LOGOS: Record<string, React.ComponentType> = {
  "srm": LogoSRM,
  "srm university": LogoSRM,
  "vit": LogoVIT,
  "vit university": LogoVIT,
  "google": LogoGoogle,
  "google for developers": LogoGoogle,
  "aws": LogoAWS,
  "microsoft": LogoMicrosoft,
  "microsoft learn": LogoMicrosoft,
  "nasscom": LogoNasscom,
  "nasscom foundation": LogoNasscom,
  "ict": LogoICT,
  "ict academy": LogoICT,
};

function GenericLogo({ name }: { name: string }) {
  const initials = name.split(/\s+/).map((w) => w[0]).join("").slice(0, 3).toUpperCase();
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
        <span className="text-[10px] font-black text-gray-500">{initials}</span>
      </div>
      <p className="text-[11px] font-bold text-gray-700 whitespace-nowrap">{name}</p>
    </div>
  );
}

export default function PartnerLogo({ name }: { name: string }) {
  const Preset = PRESET_LOGOS[name.trim().toLowerCase()];
  return Preset ? <Preset /> : <GenericLogo name={name} />;
}
