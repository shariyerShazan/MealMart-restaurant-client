import FeatureSection from "../components/shared/FeatureSection"
import HeroSection from "../components/shared/HeroSection"
import PopularDishes from "../components/shared/PopularDishes"
import UserFeedback from "../components/shared/UserFeedback"

function Home() {
  return (
    <div className="min-h-[70vh]">
       <HeroSection />
       <FeatureSection />
       <PopularDishes />
       <UserFeedback />
    </div>
  )
}

export default Home
