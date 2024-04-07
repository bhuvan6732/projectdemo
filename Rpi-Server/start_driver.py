import pyautogui
import time
import sys

timer=0.1
pyautogui.hotkey('winleft', 's')
time.sleep(timer)
pyautogui.write('Command Prompt')
time.sleep(timer)
pyautogui.press('enter')
time.sleep(timer)
pyautogui.hotkey('alt', 'space')
time.sleep(timer)
pyautogui.press('x')
pyautogui.press('enter')
arguments = sys.argv[1:] 
print(arguments)
script_trigger="python C:\\Users\\bhuvaneshwaran\\Desktop\\project\\Project\\Rpi-Server\\driver.py "+' '.join(arguments)
pyautogui.write(script_trigger)
pyautogui.press('enter')
print("Started UAV")