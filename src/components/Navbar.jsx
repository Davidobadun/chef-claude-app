import '../index.css'
import chefIcon from "/images/chef-claude-icon.png"

function Navbar() {
    return (
        <>
        <header className="header-container">
            <img src={chefIcon} alt=" chef claude icon"/>
            <h2> Chef Claude </h2>
        </header>
        </>
    )

}

export default Navbar