import Button from "../../atoms/Button";
import IconPlaceholder from "../../atoms/IconPlaceholder";
import InputForm from "../../molecules/InputForm";


export default function Navbar({children, className, ...props}) {
    return (
        <>
        <head {...props}>
            <body className="overflow-x-hidden">
                <header>
                    <div className="container">
                        <nav className="navbar navbar-expand-sm bg-blue-200">
                            <div className="container-fluid my-2">
                                <img 
                                src="" 
                                alt="LOGO" 
                                width="30" 
                                height="30" 
                                class="img-fluid"
                                />
                                
                                <div clasName="offcanvas offcanvas-end">
                                    <InputForm 
                                    type="search"
                                    name="search"
                                    id="search"
                                    placeholder="Search..."
                                    className="rounded-2 pt-3"
                                    />
                                </div>
                                
                                <IconPlaceholder 
                                variant="envelope"
                                style={{width : 30, height : 30}}/>
                                
                                <div className="off-canvas body">                                   
                                    <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className="rounded-2 bg-blue-200"
                                    >Log In</Button>

                                    <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className="rounded-2 bg-blue-200"
                                    >Sign Up</Button>  
                                </div>
                            </div>
                        </nav>
                    </div>
                </header>
            </body>
        </head>
        </>
    )
}