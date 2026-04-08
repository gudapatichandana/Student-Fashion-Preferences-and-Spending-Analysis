interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  id?: string;
}

const SectionHeader = ({ title, subtitle, id }: SectionHeaderProps) => (
  <div className="mb-8" id={id}>
    <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
    {subtitle && <p className="text-muted-foreground text-base mt-2 font-medium">{subtitle}</p>}
  </div>
);

export default SectionHeader;
