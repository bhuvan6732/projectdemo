import geocoder
import os
import sys 
import cv2
import requests
FREQUENCY=3

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

class drone():
    id=''
    user_id=''
    def __init__(self,lat,long,id,user_id):
        self.id= id
        self.user_id=user_id       
        self.current_Posistion ={
            "latitude":0,
            "longitude":0
        }
        self.location = "Chennai, India"
        self.Destination={
            "latitude":lat,
            "longitude":long
        }
        self.navigation_started= False


    def display_status(self):
        clear_screen()
        if(self.navigation_started == False):
            print("\nUAV initialized: ",self.navigation_started)
            print("\nUAV is docked for storage...")
        if self.navigation_started:
            print("\nUAV initialized: ",self.navigation_started)
            print("\nUAV Current Position:",self.current_Posistion)
            print("\nUAV Destination",self.Destination)


    def update_position(self):
        try:   
            coordinates = geocoder.osm(self.location)
            if coordinates:
                self.current_Posistion["latitude"] = coordinates.latlng[0]
                self.current_Posistion["longitude"] = coordinates.latlng[1]
                self.display_status()
            else:
                print("Location not found")
                self.update_position()
        except Exception as e:
            print("An error occurred:", e)
            print("Re-trying")
            self.update_position()
            

    def drone_driver(self):
        if  self.navigation_started:
            print("\nNavigation to ", self.Destination, " current posistion is ", self.current_Posistion )
            #while self.current_Posistion["latitude"] !=self.Destination["latitude"] and self.current_Posistion["longitude"] !=self.Destination["longitude"]:
            self.update_position()
        else:
            print("Drone navigation as not yet started! \nStarting navigation to",self.Destination)
            self.navigator()


    def navigator(self):
        self.navigation_started= True
        self.drone_driver()

    def capture_footage(self):
        for clip in range(1,FREQUENCY):
            self.filePath= "C:\\Users\\bhuvaneshwaran\\Desktop\\project\\Project\\Rpi-Server\\"+self.id+"_"+self.user_id+"_clip_"+str(clip)+'.avi'
            cap = cv2.VideoCapture(0)  
            fourcc = cv2.VideoWriter_fourcc(*'XVID')
            out = cv2.VideoWriter(self.filePath, fourcc, 20.0, (640, 480))  
            duration = 10 
            start_time = cv2.getTickCount()
            while True:
                ret, frame = cap.read()
                if ret:
                    out.write(frame)
                    cv2.imshow('frame', frame)
                    current_time = cv2.getTickCount()
                    elapsed_time = (current_time - start_time) / cv2.getTickFrequency()
                    if elapsed_time > duration:
                        break
                    if cv2.waitKey(1) & 0xFF == ord('q'):
                        break
                else:
                    break
            cap.release()
            out.release()
            cv2.destroyAllWindows()
            self.send_footage(self.filePath)

    def send_footage(self,filepath):
        api_endpoint = 'http://localhost:3000/api/help/upload' 
        file_path = filepath
        try:
            with open(file_path, 'rb') as file:
                files = {'footage': (file_path, file, 'multipart/form-data')}
                response = requests.post(api_endpoint, files=files , data={"user_id":self.user_id})
            if response.status_code == 200:
                    print('File Sent successfully.')
            else:
                print('Upload failed. Status code:', response.status_code)
        except FileNotFoundError:
            print('File not found. Please check the file path.')
        except Exception as e:
            print('An error occurred:', e)


arguments = sys.argv[1:] 
print(arguments)
a = drone (arguments[0],arguments[1],arguments[2],arguments[3])
a.drone_driver()
a.capture_footage()
