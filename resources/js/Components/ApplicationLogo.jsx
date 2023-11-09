import { BiLogoMedium } from "react-icons/bi";

export default function ApplicationLogo(props) {
    return (
        <>
            <div className="flex">
                <BiLogoMedium className="h-9 w-9" />
                <span className="flex items-center">imashSignature</span>
            </div>
        </>
    );
}
