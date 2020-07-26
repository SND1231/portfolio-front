# Ramen share

自分の好きなラーメンの写真を投稿して、感想を共有するwebアプリです。<br>
簡易ログインからテストユーザとしてログインが可能です。

# 機能一覧

・ログイン/ログアウト<br>
・ユーザー登録<br>
・ユーザの詳細<br>
・投稿一覧<br>
・投稿の詳細<br>
・投稿の作成/編集/削除<br>
・いいね/いいね取り消し<br>
・コメント作成

# 使用技術

・go 1.14.4<br>
・grpc-gateway<br>
・vue 2.6.11<br>
・AWS(EKS、ELB、Route53、ACM、RDS、EC2)<br>
・docker-compose<br>
・docker hub<br>
・CircleCI<br>
・nginx<br>
・Skaffold<br>
・Cloudinary<br>

# 構成図

![SystemConfiguration](https://user-images.githubusercontent.com/38371773/88473788-e938aa80-cf5b-11ea-9b04-c44ea7b80ea1.png)


# アピール、こだわりポイント

・GRPC、EKSを使用したマイクロサービスアーキテクチャ<br>
・CircleCI、SkaffoldでCI/CD パイプラインの構築<br>
・APIの実行を少なくなるようにサービス分割を考えた<br>
・Cloudinaryを使用して画像のURLのみをDBに保存して、画像の管理を容易にした<br>

