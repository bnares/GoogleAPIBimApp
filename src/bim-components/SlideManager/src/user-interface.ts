import * as BUI from "@thatopen/ui"
import * as OBC from "@thatopen/components"
import {SlideManager} from ".."


export function SlidesUI(components: OBC.Components, world: OBC.World){
  const slides = components.get(SlideManager);

  async function newSlide(){
    await slides.uploadScreenshot(world);
  }

  return BUI.html`
    <bim-toolbar-section label="Google Slides" icon="duo-icons:slideshow">
	    <bim-button label="Create Slide" icon="material-symbols-light:add-ad" @click=${newSlide}></bim-button>
	  </bim-toolbar-section>
  `
}