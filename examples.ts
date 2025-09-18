export const EXAMPLES: Record<string, string> = {
  javascript: `function calculateFactorial(n) {
  if (n < 0) {
    return "Error: Factorial is not defined for negative numbers.";
  }
  // This recursive implementation is inefficient for large numbers
  // and can lead to stack overflow.
  if (n === 0) {
    return 1;
  } else {
    return n * calculateFactorial(n - 1);
  }
}

console.log(calculateFactorial(5));
console.log(calculateFactorial(15)); // This is getting slow...
`,
  typescript: `interface User {
  id: number;
  name: string;
  email: any; // Using 'any' is generally a bad practice.
}

function sendEmail(user: User, message: string) {
  // Missing validation for user.email
  console.log(\`Sending email to \${user.email}: \${message}\`);
  return true;
}

const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com'
};

sendEmail(user, "Hello World!");
`,
  python: `import json

# This function has a potential security vulnerability (insecure deserialization)
# and lacks proper error handling.
def load_user_data(data_string):
    user_data = json.loads(data_string)
    # The 'admin' key is not checked or sanitized.
    if user_data.get('admin'):
        print("Admin access granted!")
    return user_data

# Malicious input could exploit this.
malicious_string = '{"name": "hacker", "admin": true}'
load_user_data(malicious_string)
`,
  java: `import java.util.ArrayList;
import java.util.List;

public class ShoppingCart {
    // The items list is mutable and can be modified from outside the class.
    public List<String> items;

    public ShoppingCart() {
        this.items = new ArrayList<>();
    }

    public void addItem(String item) {
        this.items.add(item);
    }

    // A getter that exposes the internal list directly.
    public List<String> getItems() {
        return items;
    }

    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();
        cart.addItem("Apple");
        cart.addItem("Banana");

        // External code can modify the cart's internal state.
        List<String> cartItems = cart.getItems();
        cartItems.clear(); // This empties the cart unexpectedly.

        System.out.println("Items in cart: " + cart.items.size());
    }
}
`,
  csharp: `using System;
using System.Threading.Tasks;

// This class doesn't properly handle async void and exceptions.
public class EmailService
{
    public async void SendWelcomeEmail(string userEmail)
    {
        try
        {
            // Simulating a long-running network operation
            await Task.Delay(2000);
            
            if (string.IsNullOrEmpty(userEmail))
            {
                // This exception will crash the application because it's in an async void method.
                throw new ArgumentNullException(nameof(userEmail));
            }

            Console.WriteLine($"Welcome email sent to {userEmail}");
        }
        catch (Exception ex)
        {
            // This catch block might not behave as expected.
            Console.WriteLine($"Error sending email: {ex.Message}");
        }
    }
}
`,
};
