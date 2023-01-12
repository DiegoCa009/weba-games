import { useRef } from 'react'
import '../css/menu.css'

export default function Menu (){
    const menuBar = useRef(null);
    
    const switchMenu = ()=>{
        const computedStyles = getComputedStyle(menuBar.current);
        console.log(computedStyles.transform);
        menuBar.current.style.transform = 'translateX(0%)';
    }
  return (
    <div onClick={switchMenu} className="menu-bar" ref={menuBar}>
        <p>Menu</p>
        
    </div>
  )
}
