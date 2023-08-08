from TikTokLive import TikTokLiveClient
from TikTokLive.types.events import CommentEvent, ConnectEvent, LikeEvent, JoinEvent, GiftEvent
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from PIL import Image
import random
import time
import json
import os
import io

likers = []

scores_dict = {}
account_count = 0

gamesArray = {
    "game0": ["banana"],
    "game1": ["neighborhood"],
    "game2": ["paper"],
    "game3": ["farm"],
    "game4": ["meat"],
    "game5": ["computer"],
    "game6": ["teacher"],
    "game7": ["bike"],
    "game8": ["mouse"],
    "game9": ["bird"],
    "game10": ["fun"],
    "game11": ["university"],
    "game12": ["car"],
    "game13": ["bee"],
    "game14": ["clock"],
    "game15": ["work"],
    "game16": ["history"],
    "game17": ["glass"],
    "game18": ["tv"],
    "game19": ["road"],
    "game20": ["head"],
    "game21": ["apartment"],
    "game22": ["beautiful"],
    "game23": ["city"],
    "game24": ["pen"],
    "game25": ["dog"],
    "game26": ["plate"],
    "game27": ["diamond"],
    "game28": ["wedding"],
    "game29": ["soda"],
    "game30": ["hair"],
    "game31": ["queen"],
    "game32": ["baseball"],
    "game33": ["relationship"],
    "game34": ["library"],
    "game35": ["night"],
    "game36": ["cell"],
    "game37": ["piano"],
    "game38": ["revenue"],
    "game39": ["sister"],
    "game40": ["potato"],
    "game41": ["newspaper"],
    "game42": ["street"],
    "game43": ["bag"],
    "game44": ["metal"],
    "game45": ["family"],
    "game46": ["garden"],
    "game47": ["business"],
    "game48": ["kitchen"],
    "game49": ["mirror"],
    "game50": ["health"],
    "game51": ["country"],
    "game52": ["video"],
    "game53": ["christmas"],
    "game54": ["space"],
    "game55": ["hotel"],
    "game56": ["luck"],
    "game57": ["school"],
    "game58": ["movie"],
    "game59": ["company"],
    "game60": ["trophy"],
    "game61": ["text"],
    "game62": ["money"],
    "game63": ["idea"],
    "game64": ["north"],
    "game65": ["justice"],
    "game66": ["image"],
    "game67": ["sea"],
    "game68": ["bedroom"],
    "game69": ["answer"],
    "game70": ["imagination"],
    "game71": ["chair"],
    "game72": ["baby"],
    "game73": ["comma"],
    "game74": ["prayer"],
    "game75": ["lamp"],
    "game76": ["boat"],
    "game77": ["dream"],
    "game78": ["choir"],
    "game79": ["brain"],
    "game80": ["orange"],
    "game81": ["bakery"],
    "game82": ["mail"],
    "game83": ["chicken"],
    "game84": ["headphone"],
    "game85": ["coach"],
    "game86": ["triangle"],
    "game87": ["floor"],
    "game88": ["king"],
    "game89": ["day"],
    "game90": ["app"],
    "game91": ["student"],
    "game92": ["window"],
    "game93": ["shirt"],
    "game94": ["rain"],
    "game95": ["exam"],
    "game96": ["judge"],
    "game97": ["drink"],
    "game98": ["market"],
    "game99": ["talent"],
    "game100": ["classroom"],
    "game101": ["military"],
    "game102": ["violin"],
    "game103": ["tea"],
    "game104": ["park"],
    "game105": ["portrait"],
    "game106": ["oil"],
    "game107": ["menu"],
    "game108": ["childhood"],
    "game109": ["singer"],
    "game110": ["time"],
    "game111": ["stomach"],
    "game112": ["friend"],
    "game113": ["lion"],
    "game114": ["hand"],
    "game115": ["cabbage"],
    "game116": ["water"],
    "game117": ["mountain"],
    "game118": ["book"],
    "game119": ["eagle"],
    "game120": ["income"],
    "game121": ["cable"],
    "game122": ["snow"],
    "game123": ["cheese"],
    "game124": ["throat"],
    "game125": ["building"],
    "game126": ["trip"],
    "game127": ["engine"],
    "game128": ["scarf"],
    "game129": ["milkshake"],
    "game130": ["apple"],
    "game131": ["doctor"],
    "game132": ["wave"],
    "game133": ["error"],
    "game134": ["fairy"],
    "game135": ["needle"],
    "game136": ["frog"],
    "game137": ["toothpaste"],
    "game138": ["fireman"],
    "game139": ["zebra"],
    "game140": ["employee"],
    "game141": ["heart"],
    "game142": ["watch"],
    "game143": ["nature"],
    "game144": ["challenge"],
    "game145": ["economy"],
    "game146": ["box"],
    "game147": ["hospital"],
    "game148": ["red"],
    "game149": ["award"],
    "game150": ["knife"],
    "game151": ["garlic"],
    "game152": ["drama"],
    "game153": ["muscle"],
    "game154": ["moon"],
    "game155": ["tire"],
    "game156": ["grasshopper"],
    "game157": ["cereal"],
    "game158": ["truck"],
    "game159": ["shadow"],
    "game160": ["calculator"],
    "game161": ["horse"],
    "game162": ["planet"],
    "game163": ["strawberry"],
    "game164": ["grass"],
    "game165": ["telescope"],
    "game166": ["purse"],
    "game167": ["lobster"],
    "game168": ["temperature"],
    "game169": ["flag"],
    "game170": ["butterfly"],
    "game171": ["bus"],
    "game172": ["puzzle"],
    "game173": ["starfish"],
    "game174": ["mushroom"],
    "game175": ["eraser"],
    "game176": ["band"],
    "game177": ["factory"],
    "game178": ["pasta"],
    "game179": ["symphony"],
    "game180": ["treasure"],
    "game181": ["coffee"],
    "game182": ["mermaid"],
    "game183": ["spider"],
    "game184": ["comedy"],
    "game185": ["gym"],
    "game186": ["guitar"],
    "game187": ["magnet"],
    "game188": ["egg"],
    "game189": ["pumpkin"],
    "game190": ["letter"],
    "game191": ["story"],
    "game192": ["documentary"],
    "game193": ["ring"],
    "game194": ["stock"],
    "game195": ["bridge"],
    "game196": ["pirate"],
    "game197": ["tunnel"],
    "game198": ["astronaut"],
    "game199": ["opera"],
    "game200": ["workout"],
    "game201": ["restaurant"],
    "game202": ["octopus"],
    "game203": ["shark"],
    "game204": ["airport"],
    "game205": ["trailer"],
    "game206": ["spoon"],
    "game207": ["sun"],
    "game208": ["metro"],
    "game209": ["interview"],
    "game210": ["pyramid"],
    "game211": ["stamp"],
    "game212": ["ship"],
    "game213": ["speaker"],
    "game214": ["jelly"],
    "game215": ["salad"],
    "game216": ["football"],
    "game217": ["cow"],
    "game218": ["postcard"],
    "game219": ["innovation"],
    "game220": ["word"],
    "game221": ["feeling"],
    "game222": ["sausage"],
    "game223": ["language"],
    "game224": ["bed"],
    "game225": ["desk"],
    "game226": ["asteroid"],
    "game227": ["research"],
    "game228": ["iceberg"],
    "game229": ["design"],
    "game230": ["star"],
    "game231": ["sleep"],
    "game232": ["massage"],
    "game233": ["chart"],
    "game234": ["fish"],
    "game235": ["salon"],
    "game236": ["energy"],
    "game237": ["continent"],
    "game238": ["game"],
    "game239": ["cake"],
    "game240": ["fries"],
    "game241": ["molecule"],
    "game242": ["valentine"],
    "game243": ["gas"],
    "game244": ["soap"],
    "game245": ["flower"],
    "game246": ["brush"],
    "game247": ["galaxy"],
    "game248": ["river"],
    "game249": ["trash"],
    "game250": ["ocean"],
    "game251": ["animal"],
    "game252": ["cafeteria"],
    "game253": ["hallway"],
    "game254": ["deer"],
    "game255": ["plastic"],
    "game256": ["grammar"],
    "game257": ["soup"],
    "game258": ["math"],
    "game259": ["bathroom"],
    "game260": ["toilet"],
    "game261": ["stadium"],
    "game262": ["art"],
    "game263": ["elevator"],
    "game264": ["system"],
    "game265": ["goat"],
    "game266": ["dishwasher"],
    "game267": ["dentist"],
    "game268": ["elephant"],
    "game269": ["happiness"],
    "game270": ["keyboard"],
    "game271": ["forest"],
    "game272": ["dolphin"],
    "game273": ["rainbow"],
    "game274": ["photo"],
    "game275": ["train"],
    "game276": ["backpack"],
    "game277": ["cellphone"],
    "game278": ["pillow"],
    "game279": ["promotion"],
    "game280": ["toothbrush"],
    "game281": ["sock"],
    "game282": ["science"],
    "game283": ["microphone"],
    "game284": ["candle"],
    "game285": ["tree"],
    "game286": ["paintbrush"],
    "game287": ["necklace"],
    "game288": ["programmer"],
    "game289": ["basket"],
    "game290": ["door"],
    "game291": ["shoe"],
    "game292": ["cloud"],
    "game293": ["robot"],
    "game294": ["parrot"],
    "game295": ["light"],
    "game296": ["kettle"],
    "game297": ["perfume"],
    "game298": ["sailor"],
    "game299": ["volcano"],
    "game300": ["cookie"],
    "game301": ["circle"],
    "game302": ["wig"],
    "game303": ["church"],
    "game304": ["tooth"],
    "game305": ["yogurt"],
    "game306": ["tourist"],
    "game307": ["nose"],
    "game308": ["mailbox"],
    "game309": ["olive"],
    "game310": ["drawer"],
    "game311": ["pineapple"],
    "game312": ["island"],
    "game313": ["duck"],
    "game314": ["castle"],
    "game315": ["leaf"],
    "game316": ["brick"],
    "game317": ["honey"],
    "game318": ["suitcase"],
    "game319": ["flute"],
    "game320": ["waffle"],
    "game321": ["tie"],
    "game322": ["wardrobe"],
    "game323": ["society"],
    "game324": ["string"],
    "game325": ["friendship"],
    "game326": ["pan"],
    "game327": ["map"],
    "game328": ["highway"],
    "game329": ["music"],
    "game330": ["silk"],
    "game331": ["lemon"],
    "game332": ["iron"]
}


# Instantiate the client with the user's username
client: TikTokLiveClient = TikTokLiveClient(unique_id="@yourcoder")


# Define how you want to handle specific events via decorator
@client.on("connect")
async def on_connect(_: ConnectEvent):
    print("Connected to Room ID:", client.room_id)


# Notice no decorator?
async def on_comment(event: CommentEvent):
    print(f"{event.user.unique_id} -> {event.comment}")
    if os.path.exists("./contexto_responses_dict.json"):
        with open("contexto_responses_dict.json", "w") as f:
            f.truncate(0)
    
    curr_game_file = open("currGame.txt", "r")
    contents = curr_game_file.read()
    game_number = contents
    print("GAME #")
    print(game_number)
    curr_game_file.close()
    print(gamesArray["game"+game_number][0].lower())

    if gamesArray["game"+game_number][0].lower() == event.comment.lower():

        print('WINNING WORD FOUND')
        with open("./winning_word.json", 'w') as fi:
            json.dump({"username":event.user.unique_id,"text":event.comment}, fi)
    else:
        print("NOT GAME WINNING")
        with open("contexto_responses_dict.json", "w") as f:
            json.dump({"username":event.user.unique_id,"text":event.comment}, f)

    with open("./pronounce.txt", 'w') as pro_fi:
        pro_fi.write(event.comment.split(" ")[0])
        pro_fi.close()


async def on_join(event: JoinEvent):
    pass
    print('JOINER')
    print(event.user.unique_id)
    # print(f"{event.user.unique_id} -> joined")
    # if os.path.exists("scores_dict.json"):
    #     with open("scores_dict.json", "w") as f:
    #         f.truncate(0)
    # # Write the dictionary to a JSON file
    # with open("scores_dict.json", "w") as f:
    #     json.dump(event.user.unique_id, f)


@client.on("gift")
async def on_gift(event: GiftEvent):
    # Streakable gift & streak is over
    if event.gift.streakable and not event.gift.streaking:
        if event.gift.info.name == "Doughnut":
            with open("./gifts.txt", 'a') as fi:
                fi.write(f'g#')
                fi.flush()

        print(f"{event.user.unique_id} sent {event.gift.count}x \"{event.gift.info.name}\"")
        image_data: bytes = await event.user.avatar.download()
        image: Image = Image.open(io.BytesIO(image_data))

        try:
            with open('gifters.json', 'r') as f:
                profiles_array = json.load(f)
        except:
            profiles_array = []

        # comment will actually be a comment here later
        user_dict = dict(username=event.user.unique_id,id=str(event.user.user_id),image=str(event.user.user_id)+".jpg")

        save_path = "./images/"+str(event.user.user_id)+".jpg"
        image.save(save_path)

        if len(profiles_array) > 0:
            profiles_array.append(user_dict)
        else:
            profiles_array = [user_dict]

        file_names = []
        for file in os.listdir("./images"):
            if file.endswith(".jpg"):
                file_names.append(file)
                pass
        
        for profile in profiles_array:
            if profile["image"] not in file_names:
                profiles_array.remove(profile)

        remove_duplicate_files()
        # Write the dictionary to a JSON file
        with open("gifters.json", "w") as f:
            json.dump(profiles_array, f)
        print("commented")

    # Non-streakable gift
    elif not event.gift.streakable:
        if event.gift.info.name == "Doughnut":
            with open("./gifts.txt", 'a') as fi:
                fi.write(f'g')
                fi.flush()

        print(f"{event.user.unique_id} sent \"{event.gift.info.name}\"")
        image_data: bytes = await event.user.avatar.download()
        image: Image = Image.open(io.BytesIO(image_data))

        try:
            with open('gifters.json', 'r') as f:
                profiles_array = json.load(f)
        except:
            profiles_array = []

        # comment will actually be a comment here later
        user_dict = dict(username=event.user.unique_id,id=str(event.user.user_id),image=str(event.user.user_id)+".jpg")

        save_path = "./images/"+str(event.user.user_id)+".jpg"
        image.save(save_path)

        if len(profiles_array) > 0:
            profiles_array.append(user_dict)
        else:
            profiles_array = [user_dict]

        file_names = []
        for file in os.listdir("./images"):
            if file.endswith(".jpg"):
                file_names.append(file)
        
        for profile in profiles_array:
            if profile["image"] not in file_names:
                profiles_array.remove(profile)
    
        remove_duplicate_files()
        # Write the dictionary to a JSON file
        with open("gifters.json", "w") as f:
            json.dump(profiles_array, f)
        print("commented")


def remove_duplicate_files():
    folder_path = "images"  # path to the folder containing the images

    # get all the file names in the folder
    file_names = os.listdir("./"+folder_path)

    # create a set of unique file names
    unique_file_names = set()

    # create a list to store the duplicate file names
    duplicate_file_names = []

    # iterate over all the file names
    for file_name in file_names:
        # check if the file name is already in the set of unique file names
        if file_name in unique_file_names:
            # if it is, add the file name to the list of duplicate file names
            duplicate_file_names.append(file_name)
        else:
            # if it's not, add the file name to the set of unique file names
            unique_file_names.add(file_name)

    # iterate over the list of duplicate file names and remove them
    for duplicate_file_name in duplicate_file_names:
        file_path = os.path.join(folder_path, duplicate_file_name)
        os.remove(file_path)

print("Duplicate files removed successfully!")


# Define handling an event via "callback"
client.add_listener("comment", on_comment)
client.add_listener("join", on_join)

if __name__ == '__main__':
    # Run the client and block the main thread
    # await client.start() to run non-blocking
    client.run()

