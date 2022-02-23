export default function Logo() {
  return (
    <span
      className="inline-flex justify-start items-center gap-2 text-secondary-normal group-hover:text-secondary-hover"
    >
      <span className="bg-secondary-normal group-hover:bg-secondary-hover aspect-square w-12 rounded" />
      <span className="uppercase font-bold text-xl">Roguelike</span>
    </span>
  );
}
