import Spotlight from "@/components/spotlight";

export default function LearnMore() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h2 className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-3xl font-semibold text-transparent md:text-4xl">
              Learn More
            </h2>
            <p className="mt-4 text-lg text-indigo-200/75">
              Explore how Clash of Cards takes you through earning coins to battling your way to the top.
            </p>
          </div>

          {/* Spotlight Section */}
          <Spotlight className="relative mx-auto h-[600px] w-[600px]">
            {/* Arrows */}
            <svg
              className="absolute w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 600"
              fill="none"
            >
              {/* Arrow from Earn Coins to Buy Packs */}
              <path
                d="M300,100 C400,100 500,200 500,300"
                stroke="#6366f1"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
              />
              {/* Arrow from Buy Packs to Trade Cards */}
              <path
                d="M500,300 C500,400 400,500 300,500"
                stroke="#6366f1"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
              />
              {/* Arrow from Trade Cards to Battle */}
              <path
                d="M300,500 C200,500 100,400 100,300"
                stroke="#6366f1"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
              />
              {/* Arrow from Battle to Earn Coins */}
              <path
                d="M100,300 C100,200 200,100 300,100"
                stroke="#6366f1"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
              />
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="10"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
                </marker>
              </defs>
            </svg>

            {/* Card 1 - Earn Coins */}
            <div className="group/card absolute top-[50px] left-1/2 transform -translate-x-1/2 h-[140px] w-[200px] overflow-hidden rounded-2xl bg-gray-800 p-px">
              <div className="relative z-20 h-full rounded-[inherit] bg-gray-950">
                <div className="p-6">
                  <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                    Earn Coins
                  </span>
                  <p className="text-indigo-200/75">
                    Complete tasks and win battles to earn coins.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 - Buy Packs */}
            <div className="group/card absolute top-1/2 right-[50px] transform -translate-y-1/2 h-[140px] w-[200px] overflow-hidden rounded-2xl bg-gray-800 p-px">
              <div className="relative z-20 h-full rounded-[inherit] bg-gray-950">
                <div className="p-6">
                  <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                    Buy Packs
                  </span>
                  <p className="text-indigo-200/75">
                    Use coins to purchase exciting card packs.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 - Trade Cards */}
            <div className="group/card absolute bottom-[50px] left-1/2 transform -translate-x-1/2 h-[140px] w-[200px] overflow-hidden rounded-2xl bg-gray-800 p-px">
              <div className="relative z-20 h-full rounded-[inherit] bg-gray-950">
                <div className="p-6">
                  <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                    Trade Cards
                  </span>
                  <p className="text-indigo-200/75">
                    Exchange cards with other players in the marketplace.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 - Battle */}
            <div className="group/card absolute top-1/2 left-[50px] transform -translate-y-1/2 h-[140px] w-[200px] overflow-hidden rounded-2xl bg-gray-800 p-px">
              <div className="relative z-20 h-full rounded-[inherit] bg-gray-950">
                <div className="p-6">
                  <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                    Battle
                  </span>
                  <p className="text-indigo-200/75">
                    Compete in battles to earn more rewards.
                  </p>
                </div>
              </div>
            </div>
          </Spotlight>
        </div>
      </div>
    </section>
  );
}
