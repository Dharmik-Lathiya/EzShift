import React from 'react'
import LandingHeader from '../Component/Landing/LandingHeader'
import LandingMain from '../Component/Landing/LandingMain'
import LandingPerformance from '../Component/Landing/LandingPerformance'
import LandingFeatures from '../Component/Landing/LandingFeatures'
import LandingBuiltTechnologies from '../Component/Landing/LandingbuiltTechnologies'
import LandingIndustryPioneers from '../Component/Landing/LandingIndustryPioneers'
import LandingFinancialRevolution from '../Component/Landing/LandingFinancialRevolution'
import LandingFooter from '../Component/Landing/LandingFooter'

export default function LandingPage() {
  return (
    <main className=''>
        <LandingHeader/>
        <LandingMain/>
        <LandingPerformance/>
        <LandingFeatures/>
        <LandingBuiltTechnologies/>
        <LandingIndustryPioneers/>
        <LandingFinancialRevolution/>
        <LandingFooter/>
    </main>
  )
}
