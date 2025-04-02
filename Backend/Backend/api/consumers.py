from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = "Room"
        self.room_group_name = f"chat_{self.room_name}"
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data["message"]
        type= data["type"]
        print("message",message )
        print("data",data )
        match type:
            case "NEW_LEAD":
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "New_lead",
                        "message": message,
                    }
                )
            case "Update_Lead":
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "Update_Lead",
                        "message": message,
                    }
                )

    async def New_lead(self, event):
        message = event["message"]
        print("New_lead",message)
        await self.send(text_data=json.dumps({"type":"NEW_LEAD","message": message}))
    async def Update_Lead(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({"type":"Update_Lead","message": message}))
