interface IntroBannerProps {
  bannerImageUrl: string | null;
}

const IntroBanner = ({ bannerImageUrl }: IntroBannerProps) => {
  const defaultImageUrl =
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  const imageUrl = bannerImageUrl || defaultImageUrl;

  return (
    <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      />
      <div className="absolute inset-0 bg-black/20" />
    </section>
  );
};

export default IntroBanner;
