import axios from "axios";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = "https://12169.fullstack.clarusway.com/";

  const login = async (userInfo) => {
    dispatch(fetchStart());
    //? istek attığımız yerlerde dispatch yayınlamamız lazım. istek attıgımız yer neresi  ? =login fonk. içinde
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/auth/login/`,
        userInfo
      );
      dispatch(loginSuccess(data));
      //? fonk içinde dispatc ile logın succsı cağırmamaız lazım data ile cağırdık
      navigate("/stock");
      //? navigate için useAuthCall içinde yaptık. veriyi gönderdıkten sonra navigate ile stock a yönlendiriyoruz.
      console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      //? başarısızlık için bir dispatch daha lazım payload a ıhtıyac yok.
      console.log(error);
    }
  };

  const register = async (userInfo) => {
    dispatch(fetchStart());
    //? istek attığımız yerlerde dispatch yayınlamamız lazım. istek attıgımız yer neresi  ? =register fonk. içinde
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/register/`,
        userInfo
      );
      dispatch(registerSuccess(data));
      //? fonk içinde dispatc ile logın succsı cağırmamaız lazım data ile cağırdık
      navigate("/stock");
      //? navigate için useAuthCall içinde yaptık. veriyi gönderdıkten sonra navigate ile stock a yönlendiriyoruz.
      console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      //? başarısızlık için bir dispatch daha lazım payload a ıhtıyac yok.
      console.log(error);
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    //? istek attığımız yerlerde dispatch yayınlamamız lazım. istek attıgımız yer neresi  ? =logout fonk. içinde
    try {
      const { data } = await axios.post(`${BASE_URL}account/auth/logout/`);
      dispatch(logoutSuccess(data));
      //? fonk içinde dispatc ile logın succsı cağırmamaız lazım data ile cağırdık
      navigate("/");
      //? navigate için useAuthCall içinde yaptık. veriyi gönderdıkten sonra navigate ile stock a yönlendiriyoruz.
      console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      //? başarısızlık için bir dispatch daha lazım payload a ıhtıyac yok.
      console.log(error);
    }
  };

  return { login, register, logout };
};

export default useAuthCall;

//? Her yerde istekleri yapmak yerine tüm istekleri biryerde toplamak ve kullanılacak yerde çağırmak en iyi yöntemdir.Projelerde böyledir. burada birçok componentin için de kullanabileceğimiz bir js fonk yapmak istiyoruz.
//? login fonksiyonbun yeri değişti ve Login.jsx de login fonk yolunu değiştiriyoruz. useAuthCall u import ettık ve içinde login i süslü ile çektik.
//? fonk içinde dispatc ile logın succsı cağırmamaız lazım data ile cağırdık.aslında tüm dispatchleri çeğırdık çünkü apiden dönen vveriye göre bir action almamız lazım bunuda siptach ile alıp autSlice daki reducerlara gönderiyoruz. yani burada bir nevi autslice tanımlı fonksiyonları harekete geçiriyoruz.
//? başarısızlık için bir dispatch daha lazım payload a ıhtıyac yok.
//? navigate için useAuthCall içinde yaptık. veriyi gönderdıkten sonra navigate ile stock a yönlendiriyoruz.

//! CUSTOM HOOK NE ZAMAN YAPILIR?
//? 1.birçok component içinde kullanmamız gerekn bir fonksiyona ihtiyacınız varsa fetch gibi,componentler arası kullanmak için fonk lazımsa,
//? 2.bu fonk içinde HOOK kullanmak gerekirse
//? 3. bir jsx döndürmek gerekmiyorsa bir CustomHook yazmamız gerekir.
//! ÖNEMLİ NOT : React componenti yapamayız cunku bır jsx return eder buna ıhtıyacımız yok.

//? Hooklar ya bır component ya da bır custom hook ıcınde kullanılabılır. o yüzden burada kullanamıyoruz. Hook bır js kodları ıcınde kullanamıyoruz.
//? Hooklar use ile başlar ve componenet ismini use... ile değiştirdik.
//? custoHook içinde return içinde fonk yazıyoruz. birden çok olsaydı yazardık.Burada kullanacağımız fonksiyonu return ediyoruz.
//? custom Hookların klasörü hooks diye yazılır.
//? CustomHook jsx değil sadece fonk dödürüyor ve use ıle başlıyor. ve içinde başka hookları use... ları kullanabılırız.
