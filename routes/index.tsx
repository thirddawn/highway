import DesktopDisplay from "../islands/DesktopDisplay.tsx";
import { blurHashToDataURL } from "../static/default/blurHashTools.ts";
import { isMobile } from 'npm:is-mobile'

export default function Home() {
  const json = JSON.parse(Deno.readTextFileSync(`${Deno.cwd()}/static/house1/info.json`))

  if(isMobile()){
    return (
      <div class="container">
        <h1>Nice phone you got there</h1>
      </div>
    );
  }
  else{
    return (
      <div class="container">
        <div class="main">
          <DesktopDisplay jsonData={json} blurred={blurHashToDataURL(json.blurHashes[0])} />
        </div>
        <div class="header">
          <a href="/"><svg height="5vh" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM6 19H18V9.15745L12 3.7029L6 9.15745V19Z"></path></svg></a>
          <a href="/explore"><svg height="5vh" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM16.5 7.5L14 14L7.5 16.5L10 10L16.5 7.5ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"></path></svg></a>
          <a href="/join"><svg height="5vh" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg></a>
        </div>
      </div>
    ); 
  }
}
