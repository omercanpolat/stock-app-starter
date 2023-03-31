import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import LockIcon from "@mui/icons-material/Lock"
import image from "../assets/result.svg"
import { Link } from "react-router-dom"
import { Formik } from "formik"
import useAuthCall from "../hooks/useAuthCall"
import LoginForm, { loginScheme } from "../components/LoginForm"

const Login = () => {
  const { login } = useAuthCall();
  //? loading state i authSlice tan çekiyoruz. true-false değerini apiden gelen loading state ne göre alıyor.

  //? useAuthCall.jsx componentinin içinde useAuthCall() adında bir CUSTOMHOK yaptık.bu Hooktan login() fonksiyonunu çekip burada kullanıyoruz.
  //? login fonksiyonbun yeri değişti ve Login.jsx de login fonk yolunu değiştiriyoruz. useAuthCall u import ettık ve içinde login i süslü ile çektik.

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginScheme}
            onSubmit={(values, actions) => {
              login(values);
              actions.resetForm();
              actions.setSubmitting(false);
            }}
            component={(props) => <LoginForm {...props} />}
          ></Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Do you have not an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login

//?********************
// ? loading state i authSlice tan çekiyoruz. true-false değerini apiden gelen loading state ne göre alıyor.

// ? Submit butonuna basıldıgında POST isteği atacağız
// ? Her yerde istekleri yapmak yerine tüm istekleri biryerde toplamak ve kullanılacak yerde çağırmak en iyi yöntemdir.Projelerde böyledir. burada birçok componentin için de kullanabileceğimiz bir js fonk yapmak istiyoruz.

// ?Login fonk altına yaz

// ? login fonk yazmadan önce denemek için postman dan register / post yaptık.
// ? network ten fetch/XHR leri gödter diyerek istek atılıp atılmadıgını görebiliriz. veya devTools tan bakabılırız.

// ? istek attığımız yerlerde dispatch yayınlamamız lazım. istek attıgımız yer neresi  ? =login fonk. içinde
// ? Hooklar ya bır component ya da bır custom hook ıcınde kullanılabılır. o yüzden burada kullanamıyoruz. Hook bır js kodları ıcınde kullanamıyoruz.
// ? Hooklar use ile başlar ve componenet ismini use... ile değiştirdik.
// ? 1.birçok component içinde kullanmamız gerekn bir fonksiyona ihtiyacınız varsa fetch gibi,componentler arası kullanmak için fonk lazımsa,
// ? 2.bu fonk içinde HOOK kullanmak gerekirse
// ? 3. bir jsx döndürmek gerekmiyorsa bir CustomHook yazmamız gerekir. React componenti yapamayız cunku bır jsx return eder buna ıhtıyacımız yok.
// ? custoHook içinde return içinde fonk yazıyoruz. birden çok olsaydı yazardık.
// ? custom Hookların klasörü hooks diye yazılır.
// ? login fonksiyonbun yeri değişti ve Login.jsx de login fonk yolunu değiştiriyoruz. useAuthCall u import ettık ve içinde login i süslü ile çektik.
// ? CustomHook jsx değil sadece fonk dödürüyor ve use ıle başlıyor. ve içinde başka hookları use... ları kullanabılırız.

// ? fonk içinde dispatc ile logın succsı cağırmamaız lazım data ile cağırdık
// ? başarısızlık için bir dispatch daha lazım payload a ıhtıyac yok.
// ? navigate için useAuthCall içinde yaptık. veriyi gönderdıkten sonra navigate ile stock a yönlendiriyoruz.
//?********************

