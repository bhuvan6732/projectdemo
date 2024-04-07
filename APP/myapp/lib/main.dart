import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:geolocator/geolocator.dart';

String? userEmail;
String? userPassword;

void main() {
  runApp(MaterialApp(
    home: LoginPage(),
  ));
}

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});
  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  late Color myColor;
  late Size mediaSize;

  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  String? userEmail; // Add this to store the email
  String? userPassword; // Add this to store the password

  bool isLoggedIn = false;
  bool isError = false;
  void logout() {
    setState(() {
      isLoggedIn = false;
      emailController.clear();
      passwordController.clear();
      isError = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    myColor = Theme.of(context).primaryColor;
    mediaSize = MediaQuery.of(context).size;
    return Container(
      decoration: BoxDecoration(
        color: myColor,
        image: DecorationImage(
          image: const AssetImage("assets/images/bg.png"),
          fit: BoxFit.cover,
          colorFilter:
              ColorFilter.mode(myColor.withOpacity(0.2), BlendMode.dstATop),
        ),
      ),
      child: isLoggedIn
          ? Dashboard(
              userEmail: userEmail, // Pass the email to the Dashboard
              userPassword: userPassword, // Pass the password to the Dashboard
            )
          : Scaffold(
              backgroundColor: Colors.transparent,
              body: Stack(children: [
                Positioned(top: 80, child: _buildTop()),
                Positioned(bottom: 0, child: _buildBottom()),
              ]),
            ),
    );
  }

  Widget _buildTop() {
    return SizedBox(
      width: mediaSize.width,
      child: const Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            Icons.location_on_sharp,
            size: 100,
            color: Colors.white,
          ),
          Text(
            "GO SAFE",
            style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 40,
                letterSpacing: 2),
          )
        ],
      ),
    );
  }

  Widget _buildBottom() {
    return SizedBox(
      width: mediaSize.width,
      child: Card(
        shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.only(
          topLeft: Radius.circular(30),
          topRight: Radius.circular(30),
        )),
        child: Padding(
          padding: const EdgeInsets.all(32.0),
          child: _buildForm(),
        ),
      ),
    );
  }

  Widget _buildForm() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Welcome",
          style: TextStyle(
              color: myColor, fontSize: 32, fontWeight: FontWeight.w500),
        ),
        _buildGreyText("Please login with your information"),
        const SizedBox(height: 60),
        _buildGreyText("Email address"),
        _buildInputField(emailController),
        const SizedBox(height: 40),
        _buildGreyText("Password"),
        _buildInputField(passwordController, isPassword: true),
        const SizedBox(height: 20),
        _builderror(),
        const SizedBox(height: 20),
        _buildRememberForgot(),
        const SizedBox(height: 20),
        _buildLoginButton(),
      ],
    );
  }

  Widget _buildGreyText(String text) {
    return Text(
      text,
      style: const TextStyle(color: Colors.grey),
    );
  }

  Widget _buildInputField(TextEditingController controller,
      {isPassword = false}) {
    return TextField(
      controller: controller,
      decoration: InputDecoration(
        suffixIcon: isPassword ? Icon(Icons.remove_red_eye) : Icon(Icons.done),
      ),
      obscureText: isPassword,
    );
  }

  Widget _builderror() {
    if (isError) {
      // Show "I forgot my password" text without a button if loginError is true
      return Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            "Invalid login details",
            style: TextStyle(
              color: Color.fromRGBO(223, 8, 8, 1),
            ),
          ),
        ],
      );
    } else {
      // Return an empty Container if loginError is false
      return Container();
    }
  }

  Widget _buildRememberForgot() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        TextButton(
            onPressed: () {}, child: _buildGreyText("I forgot my password"))
      ],
    );
  }

  Widget _buildLoginButton() {
    String responseData = '';
    Future<void> fetchData() async {
      final Uri uri = Uri.parse(
          'http://192.168.1.200:3000/api/login'); // Replace with your API endpoint

      final Map<String, dynamic> data = {
        'Password': passwordController.text,
        'Email': emailController.text,
      };

      final headers = <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      };

      final response = await http.post(
        uri,
        headers: headers,
        body: jsonEncode(data),
      );
      debugPrint(response.body.toString());
      debugPrint('asdf');
      if (response.body.toString() == "\"Accepted\"") {
        debugPrint('asdf');
        setState(() {
          isLoggedIn = true;
          isError = false;
          userEmail = emailController.text; // Store the email
          userPassword = passwordController.text; // Store the password
        });
      } else {
        debugPrint(responseData);
        setState(() {
          isError = true;
        });
      }
    }

    return ElevatedButton(
      onPressed: fetchData,
      style: ElevatedButton.styleFrom(
        shape: const StadiumBorder(),
        elevation: 20,
        shadowColor: myColor,
        minimumSize: const Size.fromHeight(60),
      ),
      child: const Text("LOGIN"),
    );
  }
}
class Dashboard extends StatefulWidget {
  final String? userEmail;
  final String? userPassword;

  Dashboard({this.userEmail, this.userPassword});

  @override
  _DashboardState createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  bool isLoggedIn = true;

  @override
  Widget build(BuildContext context) {
    Future<void> sendHttpRequest() async {
        // Rest of your code
        debugPrint(userEmail);
    }

    Future<void> TriggerLogout() async {
      setState(() {
        isLoggedIn = false;
      });
    }

    return Scaffold(
      appBar: AppBar(
        title: Text('Dashboard'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('Welcome to the Dashboard!'),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: TriggerLogout,
              child: const Text('Logout'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: sendHttpRequest,
              child: const Text('Request help'),
            ),
          ],
        ),
      ),
    );
  }
}
