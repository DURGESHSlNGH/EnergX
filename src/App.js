import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import Navigation from './components/Navigation';
import Search from './components/Search';
import Home from './components/Home';

// ABIs
import RealEstate from './abis/RealEstate.json'
import Escrow from './abis/Escrow.json'

// Config
import config from './config.json';

function App() {
  const [provider, setProvider] = useState(null)
  const [escrow, setEscrow] = useState(null)

  const [account, setAccount] = useState(null)

  const [homes, setHomes] = useState([
    {
      "name": "Wind Farm Project",
      "location": "Tamil Nadu, India",
      "description": "Large-scale wind farm project located in a windy region of Tamil Nadu, India",
      "image": "https://cdn.britannica.com/10/222610-138-F0268996/britannica-insights-Phil-the-Fixer-renewable-energy.jpg?w=800&h=450&c=crop",
      "id": "1",
      "attributes": [
        {
          "trait_type": "Purchase Price",
          "value": 200
        },
        {
          "trait_type": "Estimated Capacity",
          "value": "100 MW"
        },
        {
          "trait_type": "Number of Turbines",
          "value": 50
        },
        {
          "trait_type": "Turbine Model",
          "value": "Vestas V90"
        },
        {
          "trait_type": "Average Wind Speed",
          "value": "10 m/s"
        },
        {
          "trait_type": "Project Status",
          "value": "Under Development"
        },
        {
          "trait_type": "Expected Completion",
          "value": "2025"
        }
      ]
    },
    {
      "name": "Solar Farm Project",
      "location": "Rajasthan, India",
      "description": "Large-scale solar farm project situated in the sun-drenched Thar Desert of Rajasthan, India",
      "image": "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202006/MIT-PPA-1-Press_solar_array_3.jpg?itok=42Lhjby-",
      "id": "2",
      "attributes": [
        {
          "trait_type": "Purchase Price",
          "value": 150
        },
        {
          "trait_type": "Estimated Capacity",
          "value": "50 MW"
        },
        {
          "trait_type": "Number of Panels",
          "value": 20000
        },
        {
          "trait_type": "Panel Type",
          "value": "Monocrystalline Silicon"
        },
        {
          "trait_type": "Sun Hours per Day",
          "value": "8 hours"
        },
        {
          "trait_type": "Project Status",
          "value": "Under Construction"
        },
        {
          "trait_type": "Expected Completion",
          "value": "2024"
        }
      ]
    }    
  ])
  const [home, setHome] = useState({})
  const [toggle, setToggle] = useState(false);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork()

    // const realEstate = new ethers.Contract(config[network.chainId].realEstate.address, RealEstate, provider)
    // const totalSupply = await realEstate.totalSupply()
    // const homes = []

    // for (var i = 1; i <= totalSupply; i++) {
    //   const uri = await realEstate.tokenURI(i)
    //   const response = await fetch(uri)
    //   const metadata = await response.json()
    //   homes.push(metadata)
    // }

    // setHomes(homes)

    const escrow = new ethers.Contract(config[network.chainId].escrow.address, Escrow, provider)
    setEscrow(escrow)

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
    })
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const togglePop = (home) => {
    setHome(home)
    toggle ? setToggle(false) : setToggle(true);
  }

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <Search />

      <div className='cards__section'>

        <h3>ENERGY PRODUCERS</h3>

        <hr />

        <div className='cards'>
          {homes.map((home, index) => (
            <div className='card' key={index} onClick={() => togglePop(home)}>
              <div className='card__image'>
                <img src={home.image} alt="Home" />
              </div>
              <div className='card__info'>
                <h4>{home.attributes[0].value} GO</h4>
                <p>
                  <strong>{home.attributes[2].value}</strong> Units |
                  <strong>{home.attributes[3].value}</strong> Model |
                  <strong>{home.attributes[4].value}</strong> Average Power Generation
                </p>
                <p>{home.address}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {toggle && (
        <Home home={home} provider={provider} account={account} escrow={escrow} togglePop={togglePop} />
      )}

    </div>
  );
}

export default App;
