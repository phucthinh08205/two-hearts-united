import FloatingParticles from "@/components/FloatingParticles";
import LoveMessage from "@/components/LoveMessage";
import PhotoCarousel from "@/components/PhotoCarousel";
import VoiceMessage from "@/components/VoiceMessage";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Ambient gradient background */}
      <div
        className="fixed inset-0 z-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, hsla(0, 100%, 15%, 0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, hsla(340, 60%, 20%, 0.3) 0%, transparent 50%)",
        }}
      />

      <FloatingParticles />

      <main className="relative z-10">
        <LoveMessage />
        <PhotoCarousel />
        <VoiceMessage />

        {/* Footer */}
        <footer className="text-center py-8 text-muted-foreground text-sm relative z-10">
          <p className="font-serif italic">Made with ❤️ for the love of my life</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
