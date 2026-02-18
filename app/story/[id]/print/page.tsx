interface PrintPageProps {
  params: Promise<{ id: string }>;
}

const demoPages = Array.from({ length: 10 }).map((_, idx) =>
  `This is page ${idx + 1} of your magical story. Replace with stored story data from Supabase.`
);

export default async function PrintPage({ params }: PrintPageProps) {
  const { id } = await params;

  return (
    <section className="bg-white p-4 print:p-0">
      <h1 className="mb-6 text-2xl font-bold">Storybook #{id}</h1>
      {demoPages.map((content, idx) => (
        <article key={`${id}-${idx}`} className="print-page-break min-h-[90vh] border border-paraspect-ink/10 p-8">
          <h2 className="mb-4 text-xl font-black">Page {idx + 1}</h2>
          <p className="text-lg leading-relaxed">{content}</p>
        </article>
      ))}
    </section>
  );
}
