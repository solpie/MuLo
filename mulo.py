from time import time


class MuLo():
    def __init__(self):
        self.mulos = []
        for i in range(0, 22):
            mulo = {
                'id': 0,
                'date': str(int(time())),
                'title': 'hello mulo',
                'text': '我是内容2',
                'attachment': [
                    {
                        'idx': 0,
                        'payload': '',
                        'type': 'image'},
                    {
                        'idx': 1,
                        'payload': 'base64',
                        'type': 'audio'}
                ]}
            mulo['id'] = i
            self.mulos.append(mulo)
        pass

    def getPage(self, pageIdx, count):
        c = 0
        mulos = []
        lenMuLos = len(self.mulos)
        if (pageIdx - 1) * count > lenMuLos:
            pass
        else:
            for i in range((pageIdx - 1) * count, lenMuLos):
                if c < count:
                    mulos.append(self.mulos[i])
                    c += 1
                    pass
                pass
        return mulos