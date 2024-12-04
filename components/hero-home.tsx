import VideoThumb from "@/public/images/hero-image-01.jpg";
import ModalVideo from "@/components/modal-video";

export default function HeroHome() {
  return (
    <section className="h-screen w-full">
  <div className="relative flex h-full w-full">
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/path-to-your-background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div> {/* Optional overlay */}
    </div>

    {/* Hero Content */}
    <div className="relative z-10 flex w-full flex-col items-center justify-center text-center px-4 sm:px-6">
      <h1
        className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text text-4xl font-semibold text-transparent md:text-5xl"
        data-aos="fade-up"
      >
        Welcome to Clash of Cards
      </h1>
      <p
        className="mt-6 mb-8 text-xl text-indigo-200/65"
        data-aos="fade-up"
        data-aos-delay={200}
      >
        Trade, collect, and compete in the ultimate blockchain-based card game.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <a
          className="btn group w-full max-w-xs rounded-lg bg-gradient-to-t from-indigo-600 to-indigo-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-indigo-500 sm:w-auto"
          href="#0"
          data-aos="fade-up"
          data-aos-delay={400}
        >
          Start Your Journey
        </a>
        <a
          className="btn w-full max-w-xs rounded-lg bg-gray-800 px-8 py-3 text-lg font-semibold text-gray-300 shadow-lg transition-all hover:bg-gray-700 sm:w-auto"
          href="#0"
          data-aos="fade-up"
          data-aos-delay={600}
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>

  );
}
