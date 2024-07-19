from pytube import YouTube, Channel

def get_youtube_data(channel_handle):
    # Construire l'URL de la chaîne YouTube par son handle
    channel_url = f"https://www.youtube.com/{channel_handle}"

    # Créer un objet Channel avec l'URL
    channel = Channel(channel_url)

    # Obtenir le nombre d'abonnés
    subscribers = channel.subscriber_count

    # Obtenir le nombre de vues de la chaîne
    views = sum(video.views for video in channel.videos)

    # Obtenir les likes des vidéos récentes
    likes = 0
    videos = channel.videos[:5]  # Limité aux 5 dernières vidéos pour des raisons de performance
    for video in videos:
        yt = YouTube(video.watch_url)
        video_likes = yt.initial_data['contents']['twoColumnWatchNextResults']['results']['results']['contents'][0]['videoPrimaryInfoRenderer']['videoActions']['menuRenderer']['topLevelButtons'][0]['toggleButtonRenderer']['defaultText']['simpleText']
        likes += int(video_likes.replace(",", ""))

    return {
        "subscribers": subscribers,
        "views": views,
        "likes": likes
    }

if __name__ == "__main__":
    CHANNEL_HANDLE = '@LaurelDryvsWet'  # Remplacer par le @ de la chaîne YouTube

    data = get_youtube_data(CHANNEL_HANDLE)
    print(f"Subscribers: {data['subscribers']}")
    print(f"Views: {data['views']}")
    print(f"Total Likes: {data['likes']}")
