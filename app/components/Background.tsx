export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <div className="absolute left-0 top-0 h-[520px] w-[520px] rounded-full bg-orange-600/12 blur-[180px]" />
      <div className="absolute bottom-0 right-0 h-[460px] w-[460px] rounded-full bg-orange-900/12 blur-[180px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
    </div>
  );
}
