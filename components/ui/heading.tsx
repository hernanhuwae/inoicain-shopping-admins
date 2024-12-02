interface IHeading {
  title: string;
  desc: string;
}

export const Heading: React.FC<IHeading> = ({ title, desc }) => {
  return (
    <div className="">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
};
