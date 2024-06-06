import Button from "../../atoms/Button";
import IconPlaceholder from "../../atoms/IconPlaceholder";
import InputForm from "../../molecules/InputForm";
import AvatarPlaceholder from "../../atoms/AvatarPlaceholder";

export default function Navbar({children, className, ...props}) {
    return (
        <>
        <section className="Navbar-section-1">
        <header {...props}>
            <body className="overflow-x-hidden">
                <header>
                    <div className="container-sm">
                        <nav className="navbar navbar-expand-sm">
                            <div className="container-fluid">                             
                                <img 
                                src="" 
                                width="30" 
                                height="30"
                                className="d-inline-block align-center me-4" 
                                />
                                
                                <InputForm 
                                type="search"
                                name="search"
                                id="search"
                                placeholder=" Search..."                                
                                className="d-flex flex-grow-1 p-1 w-50 rounded-2 me-5"
                                />
                            
                                
                                <IconPlaceholder 
                                variant="envelope"
                                className="fs-2 me-5"/>
                                                          
                                <div className="gap-3 d-flex">
                                <Button 
                                variant="primary" 
                                type="submit" 
                                className="px-2"
                                >Log In</Button>

                                <Button 
                                variant="primary" 
                                type="submit" 
                                className="px-2"
                                >Sign Up</Button>  
                                </div>
                                
                            </div>
                        </nav>
                    </div>
                </header>
            </body>
        </header>
        </section>

        <section className="Navbar-section-2">
        <header {...props}>
            <body className="overflow-x-hidden">
                <header>
                    <div className="container-sm">
                        <nav className="navbar navbar-expand-sm">
                            <div className="container-fluid">                             
                                <img 
                                src="" 
                                width="30" 
                                height="30"
                                className="d-inline-block align-center me-4" 
                                />
                                
                                <InputForm 
                                type="search"
                                name="search"
                                id="search"
                                placeholder=" Search..."                                
                                className="d-flex flex-grow-1 p-1 w-50 rounded-2 me-5"
                                />
                            
                                
                                <IconPlaceholder 
                                variant="envelope"
                                className="fs-2 me-5"/>
                                                          
                               <container className="">
                                <div className="gap-3 d-flex">
                                    <IconPlaceholder 
                                    variant="gear"
                                    className="fs-2"/>
                                    
                                    <AvatarPlaceholder 
                                    className=""
                                    src=""
                                    alt=""
                                    style={{width: 30, height: 30}}
                                    />
                                                                   
                                </div>
                                </container>
                            </div>
                        </nav>
                    </div>
                </header>
            </body>
        </header>
        </section>
        </>
    )
}