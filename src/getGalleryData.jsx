import axios from 'axios';
import __sitemap__ from './sitemap';

function getGalleryData() {

  const galleryIDs = [
    '72157671573143060',
    '72157642607219393',
    '72157642608822784',
    '72157641683609583',
  ];

  const queue = galleryIDs.map(function(__galId){
    // Get image gallery data from flickr
    return axios
      .get("https://api.flickr.com/services/rest/", {
        params: {
          nojsoncallback: 1,
          method: "flickr.photosets.getPhotos",
          api_key: "cf8f1cf4fdd37bce0498531da5f31ed1",
          photoset_id: __galId,
          extras: "description",
          format: "json"
        }
      })
      .catch(function(error) {
        console.log(error);
      }
    )
  });

  return axios.all(queue)
    .then(function(__queue){

      let gallery = [];

      __queue.forEach(function(response) {
        gallery = gallery.concat(response.data.photoset.photo);
      });

      __sitemap__.photography = gallery;
    }
  );
}

export default getGalleryData;