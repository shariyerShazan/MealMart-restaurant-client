import FeatureSection from "../components/shared/FeatureSection"
import HeroSection from "../components/shared/HeroSection"
import PopularDishes from "../components/shared/PopularDishes"

function Home() {
  return (
    <div className="min-h-[70vh]">
       <HeroSection />
       <FeatureSection />
       <PopularDishes />
    </div>
  )
}

export default Home
