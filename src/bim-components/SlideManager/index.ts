import * as OBC from "@thatopen/components"

export class SlideManager extends OBC.Component {
  enabled: boolean = false;
  static readonly uuid = "d6517f47-7808-440a-8c87-2beb102ad76d" as const;

  constructor(components: OBC.Components){
    super(components);
    components.add(SlideManager.uuid, this);
  }

  // The screenshot from the model must first be uploaded to google drive
	// Because later we need to access the image and the Slides API requires the 
	// image to be publicly available
  async uploadScreenshot(world: OBC.World): Promise<string | null>{

    // The screenshot is created by using the renderer, scene and camera
    const {renderer, scene, camera} = world;

    if(!renderer){
      throw new Error("SlidesManager: Your world needs a renderer to create Slides!")
    }
    const canvas = renderer.three.domElement;
    renderer.three.render(scene.three, camera.three);

    // A promise is needed to handle the canvas blob
		// This way, we can get the screenshot, use it as needed
		// And finally return the fileId, that is needed for the Slides API
    return new Promise((resolve, reject)=>{
      canvas.toBlob(async (blob)=>{
        if(!blob){
          reject(new Error("Failed to create blob from canvas"));
          return;
        }
        // Very important to create the File, because later it will be
		    // converted to a stream
        const file = new File([blob], "screenshot.jpeg");
        const data = new FormData();
        data.set("screenshot", file);

        try{
          const response = await fetch("/.netlify/functions/uploadScreenshot",{
            method:"post",
            body:data
          });

          if(!response.ok){
            reject(new Error("Failed to upload screenshot"));
            return;
          }
          const fileId = await response.json();
          resolve(fileId);
        }catch(error){
          reject(error);
        }
      })
    });
  }

  // We need to get a summary of the data from the model
	// So we iterate the selected elements looking for the Net Volume
	// We choose the volume because is an easy reference and common needed data
  async getSummary(){
    
  }

}

export * from "./src"