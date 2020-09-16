import json


def handler(event, context):
    print("event: ", event)
    res = {
        "statusCode": 201,
        "body": f"Hello world"
    }
    print(res)
    return res
        

if __name__ == "__main__":
    event =  {}
    handler(event, {})
