type PagePlaceholderProps = {
  title: string;
};

/** Temporary page body until the real page sections are built. */
export function PagePlaceholder({ title }: PagePlaceholderProps) {
  return (
    <section className="bg-cream py-28">
      <div className="container-site">
        <h1 className="max-w-hero-copy text-display-sm font-semibold text-black nav:text-display nav:font-bold">
          {title}
        </h1>
      </div>
    </section>
  );
}
