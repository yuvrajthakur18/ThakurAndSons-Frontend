import React from 'react'
import { Link as ScrollLink } from 'react-scroll';

const Footer = () => {
  return (
    <>
        <div className='' style={{backgroundColor:'e7f1f2'}}>
            <div className='d-flex'>
                <div className='img-footer' style={{padding:""}} >
                    <img 
                        src = "/get-in-touch.jpg"
                        alt = "footer image"
                        width = "600px"
                        height = "400px"
                        style={{borderRadius: '0px 0px 140px 0px'}}
                    />
                </div>
                <div className='get-in-touch' style={{padding: "100px"}}>
                    <h2 className='bona-nova-sc-regular text-center' style={{fontSize:'55px', letterSpacing:'5px', color:"#393e3f"}}>GET IN TOUCH</h2>
                    <p className='text-center' style={{color:'gray', fontSize:'16px', letterSpacing:'1px', paddingTop:'30px'}}>We don’t just plan an event, we create an experience. Let’s talk about making your dream event happen!</p>
                    <p className='text-center' style={{color:'gray', fontSize:'16px', paddingTop:'15px'}}>_________</p>
                    <p className='text-center' style={{color:'gray', fontSize:'16px', letterSpacing:'4px', paddingTop:'15px', fontStyle:"italic"}}>LET'S CHAT --</p>
                </div>
            </div>
            <div style={{padding: '100px 0px 100px 0px', backgroundColor:"white"}}>
                <div style={{fontSize: '16px', color:'gray', letterSpacing:'5px', fontWeight:'lighter'}} className='bona-nova-sc-regular text-center'>
                    <div style={{paddingBottom: '15px'}}>PHONE: <span style={{fontSize: '20px'}}>8103715252</span></div> 
                    <div style={{paddingBottom: '15px'}}>EMAIL: INFO@THAKURANDSONSEVENTS.COM</div>
                    <div style={{paddingBottom: '15px'}}>STUDIO: INDORE, UDAIPUR, PUNE</div>
                </div>
                <div style={{fontSize: '25px', color:'gray', padding:'15px 0 15px 0'}} className='text-center d-flex justify-content-center gap-4'>
                    <div><i class="bi bi-instagram"></i></div>
                    <div><i class="bi bi-pinterest"></i></div>
                    <div><i class="bi bi-facebook"></i></div>
                </div>
                <ScrollLink to='navbar' smooth={true} duration={300}>
                    <div style={{fontSize: '34px', color:'gray', fontWeight:'lighter', paddingTop: '15px', cursor:"pointer"}} className='bona-nova-sc-regular text-center'>
                        <i class="bi bi-arrow-up"></i>
                    </div>
                    <div style={{fontSize: '16px', color:'gray', letterSpacing:'5px', fontWeight:'lighter', paddingTop: '10px', cursor:"pointer"}} className='bona-nova-sc-regular text-center'>
                        BACK TO TOP
                    </div>
                </ScrollLink>
                <div style={{fontSize: '10px', color:'gray', letterSpacing:'5px', fontWeight:'lighter', paddingTop: '50px'}} className='bona-nova-sc-regular text-center'>
                    <span><i class="bi bi-c-circle"></i></span> <span style={{fontSize: '14px'}}>2024</span>, THAKUR & SONS EVENTS, ALL RIGHTS RESERVED
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer