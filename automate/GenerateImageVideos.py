# ! This is the python file to automate the jobs:
# Firstly
# a) Adding this Image to DB.json folder
# Than
# b) Adding img to index.html
# c) Adding this img to Src.js for accessing the dom
import json
import os

# this class is for accessing and managing the DB.json file
class DB:
    # default path to json file
    DB_FILE_PATH = r".\database\DB.json"

    class Keys:
        imagesPath = "imagesPath"
        images = "images"
        videosPath = "videosPath"
        videos = "videos"
    

    class Data:
        def __init__(self, dbData) -> None:
            self.images = dbData[DB.Keys.images]
            self.imagesPath = dbData[DB.Keys.imagesPath]
            self.imagesSrcFull = self.getImagesWithfullSrc()
            self.videos = dbData[DB.Keys.videos]
            self.videosPath = dbData[DB.Keys.videosPath]
            self.videosSrcFull = self.getVideosWithfullSrc()
            self.data = dbData

        def getImagesWithfullSrc(self):
            imagesName = self.images
            imagePath = self.imagesPath
            imagesFullSrc =  []

            for i in range(len(imagesName)):
                imgSrc = f"{imagePath}{imagesName[i]}"
                imagesFullSrc.append(imgSrc)

            return imagesFullSrc

        def getVideosWithfullSrc(self):
            videosName = self.videos
            videosPath = self.videosPath
            videosFullSrc =  []

            for i in range(len(videosName)):
                videoSrc = f"{videosPath}{videosName[i]}"
                videosFullSrc.append(videoSrc)

            return videosFullSrc

        def __str__(self) -> str:
            return str(self.data)


    def __init__(self, dbFilePath = DB_FILE_PATH) -> None:
        self.loadData(dbFilePath)

    def loadData(self, dbFilePath: str):
        jsonDBFile = open(dbFilePath, "r+")
        self.DATA = json.load(jsonDBFile)
        self.data = DB.Data(self.DATA)
        jsonDBFile.close()


class GenerateHTMLImgVideoTags:
    db = DB()

    def __init__(self, ) -> None:
        pass

        


# gen = GenerateHTMLImgVideoTags()
