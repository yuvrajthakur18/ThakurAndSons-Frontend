import React from 'react'
import Footer from './Footer'
import { Card } from './Card'
import { Element } from 'react-scroll'

const HomePage = () => {
  return (
    <>
    <Element name='hero_section'>
      <section className='Hero-Section' id='hero_section'>
        <div className='container absolute' style={{height: 'calc(100vh - 80px)', backgroundColor:'#e7f1f2'}}>
          <img src='/glass_heroSection.jpg' alt='HeroSection' 
          style={{
              position: 'absolute',
              top: '90px', // Adjust this to match your navbar height
              left: 0,
              width: '98.9vw',
              height: 'calc(100vh - 82px)', // Full viewport height minus navbar height
              objectFit: 'cover',
              margin: 0,
              padding: 0,
              borderTopLeftRadius: '250px 250px',
          }}>
          </img>
          <div style={{
            position: "absolute",
            top: "58%",
            left: "5%",
            transform: 'translateY(-50%)',
            textAlign: "left",
          }}>
            <h2 className='bona-nova-sc-regular' style={{color: '#1F316F', letterSpacing: '1.5px'}}>SEAMLESS PLANNINGS. BESPOKE DESIGNS.</h2>
            <h1 className='bona-nova-sc-bold pt-2'>AN <br/> UNFORGETTABLE <br/> <span style={{color: '#fad6b1'}}>EVENT</span> BEGINS <br/> HERE</h1>
            {/* <h2 className='bona-nova-sc-regular' style={{color: 'red', letterSpacing: '3px'}}><br/> INDORE, UDAIPUR & PUNE</h2> */}
          </div>
        </div>
      </section>
    </Element>
      
      {/* As seen in */}
      <Element name='ass_seen_in'>
      <section className='As_seen_in' id='as_seen_in'>
        <div className='bona-nova-sc-regular' style={{color: 'gray', letterSpacing: '11px', textAlign: 'center', paddingTop:'55px', paddingBottom:'80px', paddingLeft: '25px', paddingRight: '25px', backgroundColor:'white'}}>
          <h2 className='pt-3 pb-4'>
            AS SEEN IN
          </h2>
          <div className='d-flex justify-content-around'>
          {/* <div class="elementor-container elementor-column-gap-no"> */}
                <div class="elementor-column elementor-col-16 elementor-inner-column elementor-element elementor-element-05fc16b" data-id="05fc16b" data-element_type="column">
                  <div class="elementor-widget-wrap elementor-element-populated">
                    <div class="elementor-element elementor-element-c2df6a6 elementor-widget elementor-widget-image" data-id="c2df6a6" data-element_type="widget" data-widget_type="image.default">
                      <div class="elementor-widget-container">
                        <img fetchpriority="high" decoding="async" width="180" height="60" src="" alt="" srcset="https://handydallaireevents.com/wp-content/uploads/2023/03/Vogue-Logo-Black-100x330-1-600x198.png 600w" sizes="(max-width: 1000px) 100vw, 1000px"/> 
                      </div>
                    </div>
                  </div>
                </div>
                <div class="elementor-column elementor-col-16 elementor-inner-column elementor-element elementor-element-428c9b0" data-id="428c9b0" data-element_type="column">
                  <div class="elementor-widget-wrap elementor-element-populated">
                    <div class="elementor-element elementor-element-6ff313d elementor-widget elementor-widget-image" data-id="6ff313d" data-element_type="widget" data-widget_type="image.default">
                      <div class="elementor-widget-container">
                        <img decoding="async" width="180" height="60" src="" srcSet="https://handydallaireevents.com/wp-content/uploads/2023/03/Carats-Cake-Logo-Black-VS2-1000x330-1-600x198.png 600w" sizes="(max-width: 1000px) 100vw, 1000px"/> 
                      </div>
                    </div>
                  </div>
                </div>
                <div class="elementor-column elementor-col-16 elementor-inner-column elementor-element elementor-element-946781b" data-id="946781b" data-element_type="column">
                  <div class="elementor-widget-wrap elementor-element-populated">
                    <div class="elementor-element elementor-element-c32fb59 elementor-widget elementor-widget-image" data-id="c32fb59" data-element_type="widget" data-widget_type="image.default">
                      <div class="elementor-widget-container">
                        <img decoding="async" width="180" height="60" src="" srcSet="https://handydallaireevents.com/wp-content/uploads/2023/03/House-Beautiful-Logo-1000x330-1-600x198.png 600w" sizes="(max-width: 1000px) 100vw, 1000px"/> 
                      </div>
                    </div>
                  </div>
                </div>
                <div class="elementor-column elementor-col-16 elementor-inner-column elementor-element elementor-element-559e46f" data-id="559e46f" data-element_type="column">
                  <div class="elementor-widget-wrap elementor-element-populated">
                    <div class="elementor-element elementor-element-fb2c798 elementor-widget elementor-widget-image" data-id="fb2c798" data-element_type="widget" data-widget_type="image.default">
                      <div class="elementor-widget-container">
                        <img loading="lazy" decoding="async" width="180" height="60" src="" alt="" srcset="https://handydallaireevents.com/wp-content/uploads/2023/03/Style-Me-Pretty-Logo-1000x330-1-600x198.png 600w" sizes="(max-width: 1000px) 100vw, 1000px"/> 
                      </div>
                    </div>
                  </div>
                </div>
                <div class="elementor-column elementor-col-16 elementor-inner-column elementor-element elementor-element-7717fe2" data-id="7717fe2" data-element_type="column">
                  <div class="elementor-widget-wrap elementor-element-populated">
                  <div class="elementor-element elementor-element-3da1440 elementor-widget elementor-widget-image" data-id="3da1440" data-element_type="widget" data-widget_type="image.default">
                  <div class="elementor-widget-container">
                    <img loading="lazy" decoding="async" width="180" height="60" src="" srcSet="https://handydallaireevents.com/wp-content/uploads/2023/03/Over-the-Moon-Logo-Black-100x330-2-600x198.png 600w" sizes="(max-width: 1000px) 100vw, 1000px"/> 
                  </div>
                </div>
                </div>
                </div>
                <div class="elementor-column elementor-col-16 elementor-inner-column elementor-element elementor-element-2c0b4b0" data-id="2c0b4b0" data-element_type="column">
                    <div class="elementor-widget-wrap elementor-element-populated">
                      <div class="elementor-element elementor-element-4c17a53 elementor-widget elementor-widget-image" data-id="4c17a53" data-element_type="widget" data-widget_type="image.default">
                        <div class="elementor-widget-container">
                          <img loading="lazy" decoding="async" width="180" height="60" src="" srcSet="https://handydallaireevents.com/wp-content/uploads/2023/03/Veranda-Logo-1000x330-1-600x198.png 600w" sizes="(max-width: 1000px) 100vw, 1000px"/> 
                        </div>
                      </div>
                    </div>
                </div>
          </div>
        </div>
      </section>
      </Element>

      {/* Logo and company about */}
          {/*Color : e1e9ea */}
      <Element name='about'>
      <section className='About' id='about'>
        <div className='d-flex' style={{backgroundColor:'#e7f1f2', padding:'125px 50px'}}>
          <div className='photo' style={{paddingRight: '100px'}}>
              <img 
                style={{borderRadius: '30px 30px 200px 30px'}}
                src='/Logo.jpeg'
                alt='Logo'
                width='500px'
                height="550px"
              />
          </div>
          
          <div className='content' style={{paddingTop: "70px"}}>
              <h3 style={{fontSize: '60px', color:'#424346', fontWeight:'lighter'}} className='bona-nova-sc-regular text-left'>
                <span style={{letterSpacing:'10px'}}>THAKUR & SONS </span> <br/> 
                <span style={{letterSpacing:'5px'}}>EVENTS</span>
              </h3>
              <h5 style={{fontSize: '16px', color:'gray', letterSpacing:'5px', fontWeight:'lighter', paddingTop:'5px'}} className='bona-nova-sc-regular text-left'>A PREMIER EVENT MANAGEMENT & PLANNING FIRM</h5>

              <p className='' style={{color:'gray', fontSize:'16px', letterSpacing:'1px', paddingTop:'30px'}}>The T&S team produces events that you and your guests will talk about for years to come. Our commitment and dedication to every client is always our highest priority.</p>

              <p style={{color:'gray', paddingTop:'50px'}}>
                _________
              </p>
              <p style={{fontSize: '16px', color:'gray', letterSpacing:'5px', fontWeight:'lighter', paddingTop:'5px', fontStyle:'italic'}} className='bona-nova-sc-regular text-left'>
                MORE DETAILS --
              </p>
          </div>
        </div>
      </section>
      </Element>
      
      {/* SERVICES */}
      <Element name='services'>
      <section className='Services' id='services'>
        <div className='d-flex' style={{backgroundColor:'white'}}>
          <div style={{padding:'80px 150px'}}>
              <h2 className='bona-nova-sc-regular' style={{fontSize:'55px', letterSpacing:'4px'}} >SERVICES
              </h2>
              <p className='pt-2 ps-1'>
                __________
              </p>
              <h3 className='bona-nova-sc-regular' style={{fontSize:'35px', letterSpacing:'3px', color:'gray', font:'lighter'}}>
                WEDDINGS
              </h3>
              <p className='' style={{color:'gray', fontSize:'16px', letterSpacing:'1px', paddingLeft:'2px'}}>
                Our full-service planning package includes a robust itinerary of festivities for the entire celebratory weekend.  From the welcome reception to a farewell brunch, and everything in between.
              </p>

              <p className='pt-2 ps-1'>
                __________
              </p>
              <h3 className='bona-nova-sc-regular' style={{fontSize:'35px', letterSpacing:'3px', color:'gray', font:'lighter'}}>
                CONCERTS
              </h3>
              <p className='' style={{color:'gray', fontSize:'16px', letterSpacing:'1px', paddingLeft:'2px'}}>  
              From entry to exit, including sound checks, the main performance, and post-show celebrations, every detail of the concert experience is meticulously planned to ensure a seamless and unforgettable event.
              </p>

              <p className='pt-2 ps-1'>
                __________
              </p>
              <h3 className='bona-nova-sc-regular' style={{fontSize:'35px', letterSpacing:'3px', color:'gray', font:'lighter'}}>
                ALUMINI MEETS
              </h3>
              <p className='' style={{color:'gray', fontSize:'16px', letterSpacing:'1px', paddingLeft:'2px'}}>  
              From the opening reception to the final goodbye, every aspect of the alumni reunion is meticulously organized, ensuring a memorable and seamless event.
              </p>
          </div>
          <div className='' style={{alignContent: 'end'}}>
              <img
                src='/services.jpg'
                alt='Services'
                width='570px'
                height='670px'
                style={{borderTopLeftRadius:'200px'}}
              />
          </div>
        </div>
      </section>
      </Element>

      <Element name="events">
        <Card />
      </Element>
      <Element name="contact">
        <Footer />
      </Element>
    </>
  )
}

export default HomePage