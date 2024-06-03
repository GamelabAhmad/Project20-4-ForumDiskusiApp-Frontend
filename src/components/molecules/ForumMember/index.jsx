import AvatarPlaceHolder from "../../atoms/AvatarPlaceholder";
import TypographyText from "../../atoms/TypographyText";

export default function ForumMember({children, ...props}) {
    return (
        <>
            <div className="d-flex" {...props}>
            
            <AvatarPlaceHolder className="rounded-circle z-0 " 
            src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" 
            style={{width:30, height:30}} />
             
            <AvatarPlaceHolder className="rounded-circle z-10" 
            src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" 
            style={{width:30, height:30}} />

 
            <AvatarPlaceHolder className="rounded-circle z-20" 
            src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" 
            style={{width:30, height:30}} />

 
            <AvatarPlaceHolder className="rounded-circle z-30" 
            src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" 
            style={{width:30, height:30}} />

 
            <AvatarPlaceHolder className="rounded-circle z-40" 
            src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" 
            style={{width:30, height:30}} />

            <span><TypographyText>3000 Users</TypographyText></span>
            </div>
           
        
        </> 
    )
}	