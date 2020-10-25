import './App.css'
import { ShellBar } from '@ui5/webcomponents-react/lib/ShellBar'
import { Avatar } from '@ui5/webcomponents-react/lib/Avatar'
import { StandardListItem } from '@ui5/webcomponents-react/lib/StandardListItem'
import { Grid } from '@ui5/webcomponents-react/lib/Grid'
import logo from './assets/collab_s.slogan-removebg-preview_cut.png'

import "@ui5/webcomponents-icons/dist/icons/employee"
import Routes from "./routes/routes"


function App() {
  return (
    <>
      <ShellBar
        logo={<img alt="SAP Logo" src={logo} />}
        menuItems={<><StandardListItem data-key="1" iconEnd={false} infoState="None" selected={false} type="Active">Menu Item 1</StandardListItem><StandardListItem data-key="2" iconEnd={false} infoState="None" selected={false} type="Active">Menu Item 2</StandardListItem><StandardListItem data-key="3" iconEnd={false} infoState="None" selected={false} type="Active">Menu Item 3</StandardListItem></>}
        notificationCount={10}
        onCoPilotClick={function noRefCheck() { }}
        onLogoClick={function noRefCheck() { }}
        onMenuItemClick={function noRefCheck() { }}
        onNotificationsClick={function noRefCheck() { }}
        onProductSwitchClick={function noRefCheck() { }}
        onProfileClick={function noRefCheck() { }}
        primaryTitle="Home"
        profile={<Avatar backgroundColor="Accent3" icon="employee" imageFitType="Cover" shape="Circle" size="S" />}
        searchField={null}
        secondaryTitle="Collab dashboard"
        showProductSwitch
        startButton={null}
        style={{ '--sapShellColor':'#00c2cb'}}
      >
      </ShellBar>
      <Grid defaultSpan='XL12 L12 M12 S12' style={{padding:'2%'}}>
        <Routes />
      </Grid>
    </>
  )
}

export default App;
