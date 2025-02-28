# Zeotap_Assignment_2
Here's a **README.md** file that you can use for your CDP Support Agent Chatbot project. It includes all the necessary instructions to run the project locally and provides a detailed explanation of the features and functionalities.

```markdown
# CDP Support Agent Chatbot

This project is a **Support Agent Chatbot** designed to help users with "how-to" questions related to four Customer Data Platforms (CDPs): **Segment**, **mParticle**, **Lytics**, and **Zeotap**. The chatbot extracts relevant information from the official documentation of these CDPs to guide users on how to perform tasks or achieve specific outcomes within each platform.

## Objective

- Develop a chatbot that answers "how-to" questions related to four CDPs.
- Extract relevant information from the official documentation of each CDP to guide users on platform tasks.
- Handle variations in user queries (e.g., long questions, irrelevant queries).
- Bonus: Cross-CDP comparisons and handling advanced use cases.

## Data Sources

The chatbot retrieves information from the following official CDP documentation:

- **Segment Documentation:** [https://segment.com/docs/?ref=nav](https://segment.com/docs/?ref=nav)
- **mParticle Documentation:** [https://docs.mparticle.com/](https://docs.mparticle.com/)
- **Lytics Documentation:** [https://docs.lytics.com/](https://docs.lytics.com/)
- **Zeotap Documentation:** [https://docs.zeotap.com/home/en-us/](https://docs.zeotap.com/home/en-us/)

## Core Features

1. **Answer "How-to" Questions:**
    - The chatbot responds to user questions about how to perform tasks or use features within each CDP.
    - Example questions:
        - "How do I set up a new source in Segment?"
        - "How can I create a user profile in mParticle?"
        - "How do I build an audience segment in Lytics?"
        - "How can I integrate my data with Zeotap?"

2. **Extract Information from Documentation:**
    - The chatbot extracts relevant information from the documentation to answer user questions.
    - It navigates through the documentation to find the necessary steps or instructions.

3. **Handle Variations in Questions:**
    - Supports long or complex questions.
    - Handles irrelevant questions that don't pertain to CDPs, like "Which movie is getting released this week?"

## Bonus Features

1. **Cross-CDP Comparisons:**
    - The chatbot compares features and functionalities between the four CDPs.
    - Example: "How does Segment's audience creation process compare to Lytics'?"

2. **Advanced "How-to" Questions:**
    - The chatbot can handle complex, platform-specific questions and provide guidance on advanced configurations, integrations, or use cases.

## Tech Stack

- **Frontend:** React, TypeScript, HTML, CSS, JavaScript
- **Development Tools:** Vite (for faster development)
- **Natural Language Processing (NLP) Libraries or Document Indexing** (depending on your implementation choice)

## How to Run the Project Locally

1. **Clone the Repository:**
    - Clone the repository to your local machine:
    ```bash
    git clone https://github.com/akshayanaidu4221/Zeotap_Assignment_2.git
    ```

2. **Navigate to the Project Directory:**
    ```bash
    cd Zeotap_Assignment_2
    ```

3. **Install Dependencies:**
    - Make sure you have Node.js and npm installed. Then, run the following command to install all dependencies:
    ```bash
    npm install
    ```

4. **Run the Project Locally:**
    - Start the development server using Vite:
    ```bash
    npm run dev
    ```

5. **Access the Chatbot:**
    - Once the server is running, open your browser and navigate to:
    ```
    http://localhost:3000
    ```

    This will load the chatbot interface where you can interact with the CDP support agent.

## Project Structure

The project follows a standard React structure with TypeScript:

```
/Zeotap_Assignment_2
|-- /public
|-- /src
|   |-- /components
|   |   |-- Chatbot.tsx
|   |   |-- UserInput.tsx
|   |   |-- ResponseDisplay.tsx
|   |-- /assets
|   |-- /utils
|   |   |-- fetchDocumentation.ts
|   |-- App.tsx
|   |-- index.tsx
|-- /styles
|   |-- App.css
|   |-- Chatbot.css
|-- package.json
|-- tsconfig.json
```

- `/src/components`: Contains React components like `Chatbot.tsx`, `UserInput.tsx`, and `ResponseDisplay.tsx`.
- `/src/utils`: Contains utility functions like `fetchDocumentation.ts` for extracting information from documentation.
- `/styles`: Contains CSS files to style the components.

## How the Chatbot Works

- The chatbot uses simple document indexing or natural language processing (NLP) techniques to retrieve information from the provided documentation links.
- It identifies the user's query, determines which CDP it pertains to, and fetches the relevant instructions.
- The bot handles various question phrasing and provides accurate, contextual answers.
- If the question relates to multiple platforms (e.g., cross-CDP comparison), the bot can provide detailed comparisons.

## Notes on Implementation

- **Document Indexing Approach:** If you use a simple document indexer, you'll parse the documentation into a structured format (JSON or similar) and search through it based on user queries.
- **NLP Approach:** Alternatively, you could implement a more advanced approach using NLP techniques (e.g., keyword matching, semantic search, etc.) to understand and respond to more complex queries.

## Contributing

Feel free to fork this project and submit pull requests. If you have any suggestions or improvements, you're welcome to open an issue or submit a feature request.

## License

This project is open-source and available under the MIT License.

```

### Key Points in the README:

1. **Tech Stack**: The chatbot is built using **React** with **TypeScript**, **Vite** for fast development, and **CSS/HTML/JavaScript** for styling and functionality.
2. **Local Setup**: Clear instructions on how to clone the repo, install dependencies, and run the application locally.
3. **Features**: Describes the core and bonus features of the chatbot, including answering how-to questions, handling variations, and cross-CDP comparisons.
4. **Structure**: The project structure is laid out to help contributors and developers understand how the code is organized.