
import { NavBar } from "../Components/index";
import { ChatAppProvider } from "../Context/MrChatAppContext";
import "../styles/globals.css"
const MyApp = ({Component,pageProps}) => (
    <div>
        <ChatAppProvider>
          <  NavBar/>
<Component {...pageProps}/>
</ChatAppProvider>
    </div> 
);
 
export default MyApp;